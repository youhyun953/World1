import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from '../data/countries';
import { MISSIONS_DATA } from '../data/missions';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import {
  Country,
  GameRecord,
  LastReportData,
  Mission,
  RankingEntry,
  ResourceDelta,
  TravelProgress,
  UserProfile,
} from '../types/game';
import { calculateLevelInfo, clampResource } from '../utils/level';

export async function seedInitialCatalogIfMissing(): Promise<{
  seededCountries: number;
  seededMissions: number;
}> {
  let seededCountries = 0;
  let seededMissions = 0;

  try {
    const firstCountrySnap = await getDoc(doc(db, 'countries', 'france'));
    if (!firstCountrySnap.exists()) {
      for (const c of COUNTRIES_DATA) {
        const ref = doc(db, 'countries', c.countryId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            countryId: c.countryId,
            countryName: c.countryName,
            continent: c.continent,
            capital: c.capital,
            flag: c.flag,
            description: c.description,
            climate: c.climate,
            geography: c.geography,
            landmarks: c.landmarks,
            unlockCondition: c.unlockCondition,
          });
          seededCountries += 1;
        }
      }
    }

    const firstMissionSnap = await getDoc(doc(db, 'missions', 'fra_geo_1'));
    if (!firstMissionSnap.exists()) {
      for (const m of MISSIONS_DATA) {
        const ref = doc(db, 'missions', m.missionId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            missionId: m.missionId,
            countryId: m.countryId,
            missionType: m.missionType,
            title: m.title,
            description: m.description,
            question: m.question,
            choices: m.choices.map((ch) => ({
              id: ch.id,
              label: ch.label,
            })),
            correctAnswer: m.correctAnswer || '',
            explanation: m.explanation,
            psychologyConcept: m.psychologyConcept || '',
            rewards: m.rewards,
            difficulty: m.difficulty,
          });
          seededMissions += 1;
        }
      }
    }
  } catch (error) {
    // Catalog seeding is idempotent; log and surface if permission fails
    handleFirestoreError(error, OperationType.WRITE, 'countries|missions');
  }

  return { seededCountries, seededMissions };
}

export async function selectCurrentCountry(uid: string, countryId: string): Promise<void> {
  const ref = doc(db, 'travelProgress', uid);
  try {
    await updateDoc(ref, {
      currentCountry: countryId,
      currentMission: '',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `travelProgress/${uid}`);
  }
}

export async function toggleUnlockAllMode(uid: string, unlockAllMode: boolean): Promise<void> {
  const ref = doc(db, 'travelProgress', uid);
  try {
    await updateDoc(ref, {
      unlockAllMode,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `travelProgress/${uid}`);
  }
}

export async function replenishTravelResources(uid: string): Promise<void> {
  const ref = doc(db, 'travelProgress', uid);
  try {
    await updateDoc(ref, {
      totalBudget: 3000,
      totalTravelTime: 120,
      safety: 85,
      satisfaction: 75,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `travelProgress/${uid}`);
  }
}

export async function fetchUserGameRecords(uid: string): Promise<GameRecord[]> {
  try {
    const q = query(
      collection(db, 'gameRecords'),
      where('userId', '==', uid),
      orderBy('playedAt', 'desc'),
      limit(100)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<GameRecord, 'id'>),
    }));
  } catch (error) {
    // Fallback without orderBy in case composite index is still building
    try {
      const fallbackQ = query(
        collection(db, 'gameRecords'),
        where('userId', '==', uid),
        limit(100)
      );
      const snap = await getDocs(fallbackQ);
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<GameRecord, 'id'>),
      }));
      return list.sort((a, b) => {
        const tA = (a.playedAt as { seconds?: number } | null)?.seconds ?? 0;
        const tB = (b.playedAt as { seconds?: number } | null)?.seconds ?? 0;
        return tB - tA;
      });
    } catch (innerError) {
      handleFirestoreError(innerError, OperationType.LIST, 'gameRecords');
    }
  }
}

export async function fetchLeaderboard(): Promise<RankingEntry[]> {
  try {
    const q = query(
      collection(db, 'rankings'),
      orderBy('totalScore', 'desc'),
      limit(50)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as RankingEntry);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'rankings');
  }
}

export interface MissionCompletionInput {
  uid: string;
  country: Country;
  mission: Mission;
  selectedAnswer: string;
  resultLabel: string;
  isSuccessForPoints: boolean;
  resourceDelta: ResourceDelta;
  learnedConcept: string;
}

export async function completeMissionTransaction(
  input: MissionCompletionInput
): Promise<LastReportData> {
  const {
    uid,
    country,
    mission,
    selectedAnswer,
    resultLabel,
    isSuccessForPoints,
    resourceDelta,
    learnedConcept,
  } = input;

  const userRef = doc(db, 'users', uid);
  const progressRef = doc(db, 'travelProgress', uid);
  const rankingRef = doc(db, 'rankings', uid);
  const recordId = `${uid}_${mission.missionId}`;
  const recordRef = doc(db, 'gameRecords', recordId);

  try {
    return await runTransaction(db, async (tx) => {
      const userSnap = await tx.get(userRef);
      const progressSnap = await tx.get(progressRef);
      const rankingSnap = await tx.get(rankingRef);
      const recordSnap = await tx.get(recordRef);

      if (!userSnap.exists() || !progressSnap.exists()) {
        throw new Error('여행자 프로필 데이터를 찾을 수 없습니다. 다시 로그인해 주세요.');
      }

      const userData = userSnap.data() as UserProfile;
      const progressData = progressSnap.data() as TravelProgress;

      const alreadyCompleted =
        recordSnap.exists() || progressData.completedMissionIds.includes(mission.missionId);

      if (alreadyCompleted) {
        return {
          countryId: country.countryId,
          missionId: mission.missionId,
          missionTitle: mission.title,
          missionType: mission.missionType,
          selectedAnswer,
          resultLabel: `${resultLabel} (연습 모드 — 이미 완료한 미션)`,
          scoreEarned: 0,
          experienceEarned: 0,
          resourceDelta: { budget: 0, time: 0, safety: 0, satisfaction: 0 },
          learnedConcept,
          alreadyCompleted: true,
        };
      }

      const scoreEarned = isSuccessForPoints
        ? mission.rewards.score
        : Math.round(mission.rewards.score * 0.35);
      const experienceEarned = isSuccessForPoints
        ? mission.rewards.experience
        : Math.round(mission.rewards.experience * 0.45);

      const newTotalScore = userData.totalScore + scoreEarned;
      const newExperience = userData.experience + experienceEarned;
      const oldLevel = userData.level;
      const levelInfo = calculateLevelInfo(newExperience);
      const newLevel = levelInfo.level;

      const nextVisited = progressData.visitedCountries.includes(country.countryId)
        ? progressData.visitedCountries
        : [...progressData.visitedCountries, country.countryId];

      const newlyEarnedStamp = !progressData.collectedStamps.includes(country.countryId)
        ? country.stampName
        : undefined;

      const nextStamps = progressData.collectedStamps.includes(country.countryId)
        ? progressData.collectedStamps
        : [...progressData.collectedStamps, country.countryId];

      const nextCompletedIds = [...progressData.completedMissionIds, mission.missionId];

      let newlyUnlockedCountryId: string | undefined;
      const nextUnlocked = [...progressData.unlockedCountries];
      if (country.nextCountryId && !nextUnlocked.includes(country.nextCountryId)) {
        nextUnlocked.push(country.nextCountryId);
        newlyUnlockedCountryId = country.nextCountryId;
      }

      const nextBudget = clampResource(progressData.totalBudget + resourceDelta.budget, 0, 10000);
      const nextTime = clampResource(progressData.totalTravelTime + resourceDelta.time, 0, 500);
      const nextSafety = clampResource(progressData.safety + resourceDelta.safety, 0, 100);
      const nextSatisfaction = clampResource(
        progressData.satisfaction + resourceDelta.satisfaction,
        0,
        100
      );

      // Write immutable game record
      tx.set(recordRef, {
        userId: uid,
        missionId: mission.missionId,
        countryId: country.countryId,
        missionType: mission.missionType,
        missionTitle: mission.title.slice(0, 160),
        selectedAnswer: selectedAnswer.slice(0, 300),
        result: resultLabel.slice(0, 120),
        scoreEarned,
        experienceEarned,
        budgetChange: resourceDelta.budget,
        timeChange: resourceDelta.time,
        safetyChange: resourceDelta.safety,
        satisfactionChange: resourceDelta.satisfaction,
        learnedConcept: learnedConcept.slice(0, 200),
        playedAt: serverTimestamp(),
      });

      // Update user stats
      tx.update(userRef, {
        level: newLevel,
        experience: newExperience,
        totalScore: newTotalScore,
        visitedCountries: nextVisited,
        completedMissions: nextCompletedIds.length,
        updatedAt: serverTimestamp(),
      });

      // Update travel progress
      tx.update(progressRef, {
        currentCountry: country.countryId,
        currentMission: mission.missionId,
        unlockedCountries: nextUnlocked,
        visitedCountries: nextVisited,
        collectedStamps: nextStamps,
        completedMissionIds: nextCompletedIds,
        totalBudget: nextBudget,
        totalTravelTime: nextTime,
        safety: nextSafety,
        satisfaction: nextSatisfaction,
        updatedAt: serverTimestamp(),
      });

      // Update public ranking
      const rankingPayload = {
        nickname: userData.nickname,
        totalScore: newTotalScore,
        level: newLevel,
        visitedCountryCount: nextVisited.length,
        completedMissionCount: nextCompletedIds.length,
        stampCount: nextStamps.length,
        updatedAt: serverTimestamp(),
      };

      if (rankingSnap.exists()) {
        tx.update(rankingRef, rankingPayload);
      } else {
        tx.set(rankingRef, {
          userId: uid,
          ...rankingPayload,
        });
      }

      return {
        countryId: country.countryId,
        missionId: mission.missionId,
        missionTitle: mission.title,
        missionType: mission.missionType,
        selectedAnswer,
        resultLabel,
        scoreEarned,
        experienceEarned,
        resourceDelta,
        learnedConcept,
        newlyUnlockedCountryId:
          newlyUnlockedCountryId && COUNTRIES_BY_ID[newlyUnlockedCountryId]
            ? newlyUnlockedCountryId
            : undefined,
        newlyEarnedStamp,
        alreadyCompleted: false,
        leveledUpTo: newLevel > oldLevel ? newLevel : undefined,
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `gameRecords/${recordId}`);
  }
}
