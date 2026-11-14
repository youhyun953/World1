import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { TravelProgress, UserProfile } from '../types/game';

export async function ensureUserDocuments(
  user: User,
  preferredNickname?: string
): Promise<{ profile: UserProfile; progress: TravelProgress }> {
  const uid = user.uid;
  const userRef = doc(db, 'users', uid);
  const progressRef = doc(db, 'travelProgress', uid);
  const rankingRef = doc(db, 'rankings', uid);

  const fallbackNickname =
    preferredNickname?.trim().slice(0, 30) ||
    user.displayName?.trim().slice(0, 30) ||
    user.email?.split('@')[0]?.slice(0, 30) ||
    '세계여행자';

  let userSnap;
  try {
    userSnap = await getDoc(userRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
  }

  let profile: UserProfile;

  if (!userSnap.exists()) {
    const newProfile: UserProfile = {
      uid,
      email: user.email || `${uid}@traveler.local`,
      nickname: fallbackNickname,
      level: 1,
      experience: 0,
      totalScore: 0,
      visitedCountries: [],
      completedMissions: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    try {
      await setDoc(userRef, newProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${uid}`);
    }
    profile = newProfile;
  } else {
    profile = userSnap.data() as UserProfile;
  }

  let progressSnap;
  try {
    progressSnap = await getDoc(progressRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `travelProgress/${uid}`);
  }

  let progress: TravelProgress;

  if (!progressSnap.exists()) {
    const newProgress: TravelProgress = {
      userId: uid,
      currentCountry: 'france',
      currentMission: '',
      unlockedCountries: ['france'],
      visitedCountries: [],
      collectedStamps: [],
      completedMissionIds: [],
      totalBudget: 3000,
      totalTravelTime: 120,
      safety: 85,
      satisfaction: 75,
      unlockAllMode: false,
      updatedAt: serverTimestamp(),
    };
    try {
      await setDoc(progressRef, newProgress);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `travelProgress/${uid}`);
    }
    progress = newProgress;
  } else {
    progress = progressSnap.data() as TravelProgress;
  }

  // Ensure ranking doc exists
  try {
    const rankingSnap = await getDoc(rankingRef);
    if (!rankingSnap.exists()) {
      await setDoc(rankingRef, {
        userId: uid,
        nickname: profile.nickname,
        totalScore: profile.totalScore,
        level: profile.level,
        visitedCountryCount: progress.visitedCountries.length,
        completedMissionCount: profile.completedMissions,
        stampCount: progress.collectedStamps.length,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `rankings/${uid}`);
  }

  return { profile, progress };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  nickname: string
): Promise<User> {
  await setPersistence(auth, browserLocalPersistence);
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const cleanNickname = nickname.trim().slice(0, 30) || '세계여행자';
  await updateProfile(credential.user, { displayName: cleanNickname });
  await ensureUserDocuments(credential.user, cleanNickname);
  return credential.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  await setPersistence(auth, browserLocalPersistence);
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  await ensureUserDocuments(credential.user);
  return credential.user;
}

export async function signInWithGoogle(): Promise<User> {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithPopup(auth, googleProvider);
  await ensureUserDocuments(result.user);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export async function updateTravelerNickname(uid: string, nickname: string): Promise<void> {
  const clean = nickname.trim().slice(0, 30);
  if (!clean) return;

  const userRef = doc(db, 'users', uid);
  const rankingRef = doc(db, 'rankings', uid);

  try {
    await updateDoc(userRef, {
      nickname: clean,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
  }

  try {
    await updateDoc(rankingRef, {
      nickname: clean,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `rankings/${uid}`);
  }
}
