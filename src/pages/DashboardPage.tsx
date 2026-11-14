import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Clock,
  Edit3,
  MapPin,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from '../data/countries';
import { MISSIONS_DATA } from '../data/missions';
import { updateTravelerNickname } from '../services/authService';
import { fetchUserGameRecords, replenishTravelResources } from '../services/gameService';
import { AppView, GameRecord, TravelProgress, UserProfile } from '../types/game';
import { calculateLevelInfo, evaluateTravelEnding } from '../utils/level';
import { ResourceHUD } from '../components/ResourceHUD';

interface DashboardPageProps {
  profile: UserProfile;
  progress: TravelProgress;
  onNavigate: (view: AppView) => void;
  onSelectCountryAndOpenMap: (countryId: string) => void;
}

export function DashboardPage({
  profile,
  progress,
  onNavigate,
  onSelectCountryAndOpenMap,
}: DashboardPageProps) {
  const [recentRecords, setRecentRecords] = useState<GameRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(profile.nickname);
  const [savingName, setSavingName] = useState(false);
  const [replenishing, setReplenishing] = useState(false);

  const levelInfo = calculateLevelInfo(profile.experience);
  const currentCountry = COUNTRIES_BY_ID[progress.currentCountry] || COUNTRIES_DATA[0];
  const ending = evaluateTravelEnding(progress, profile.totalScore);

  useEffect(() => {
    setNicknameInput(profile.nickname);
  }, [profile.nickname]);

  useEffect(() => {
    let active = true;
    setLoadingRecords(true);
    fetchUserGameRecords(profile.uid)
      .then((list) => {
        if (active) setRecentRecords(list.slice(0, 5));
      })
      .catch((err) => {
        console.error('최근 기록 로드 실패:', err);
      })
      .finally(() => {
        if (active) setLoadingRecords(false);
      });

    return () => {
      active = false;
    };
  }, [profile.uid, profile.completedMissions]);

  const handleSaveNickname = async () => {
    if (!nicknameInput.trim()) return;
    setSavingName(true);
    try {
      await updateTravelerNickname(profile.uid, nicknameInput);
      setEditingName(false);
    } finally {
      setSavingName(false);
    }
  };

  const handleReplenish = async () => {
    setReplenishing(true);
    try {
      await replenishTravelResources(profile.uid);
    } finally {
      setReplenishing(false);
    }
  };

  const currentCountryMissions = MISSIONS_DATA.filter(
    (m) => m.countryId === currentCountry.countryId
  );
  const completedInCurrent = currentCountryMissions.filter((m) =>
    progress.completedMissionIds.includes(m.missionId)
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      {/* Traveler Header & Level Progress */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-medium text-teal-700">
            나의 여행자 여권 프로필 · {profile.email}
          </div>

          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={30}
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="px-3 py-1.5 text-base font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
              <button
                type="button"
                disabled={savingName}
                onClick={handleSaveNickname}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
              >
                {savingName ? '저장 중' : '저장'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingName(false);
                  setNicknameInput(profile.nickname);
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg cursor-pointer"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{profile.nickname}</h1>
              <button
                type="button"
                onClick={() => setEditingName(true)}
                aria-label="닉네임 수정"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <Edit3 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="text-sm text-slate-600 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900">
              Lv.{levelInfo.level} {levelInfo.title}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">총 경험치 {profile.experience.toLocaleString()} XP</span>
            {levelInfo.nextXp && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 tabular-nums">
                  다음 레벨까지 {Math.max(0, levelInfo.nextXp - profile.experience).toLocaleString()} XP
                </span>
              </>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>레벨 성장률</span>
            <span className="font-semibold tabular-nums">{levelInfo.progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(6, levelInfo.progressPercent)}%` }}
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>세계지도로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>누적 점수</span>
            <Trophy className="w-4 h-4 text-amber-600" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {profile.totalScore.toLocaleString()}점
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>방문한 국가</span>
            <MapPin className="w-4 h-4 text-sky-600" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {progress.visitedCountries.length} / {COUNTRIES_DATA.length}개국
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>완료한 미션</span>
            <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {progress.completedMissionIds.length} / {MISSIONS_DATA.length}개
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>수집한 여권 도장</span>
            <BookOpen className="w-4 h-4 text-teal-600" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
            {progress.collectedStamps.length} / {COUNTRIES_DATA.length}개
          </div>
        </div>
      </div>

      {/* Resource HUD */}
      <ResourceHUD
        progress={progress}
        onReplenish={handleReplenish}
        replenishing={replenishing}
      />

      {/* Current Country + Story Ending Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-56 shrink-0 bg-sky-50 relative min-h-[180px]">
            {currentCountry.countryId === 'france' ? (
              <img
                src="/src/assets/images/scene_paris_postcard_1794638626463.jpg"
                alt="파리 센강과 에펠탑 일러스트"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-50 to-teal-50">
                <span className="text-6xl">{currentCountry.flag}</span>
                <span className="text-xs font-mono text-slate-500 mt-3">{currentCountry.stampCode}</span>
              </div>
            )}
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-sky-700">
                현재 여행 중인 국가 · {currentCountry.continent}
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {currentCountry.flag} {currentCountry.countryName} ({currentCountry.capital})
              </h2>
              <p className="text-sm text-slate-600 line-clamp-2">{currentCountry.description}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-600 tabular-nums">
                미션 진행: {completedInCurrent} / {currentCountryMissions.length} 완료
              </span>
              <button
                type="button"
                onClick={() => onSelectCountryAndOpenMap(currentCountry.countryId)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
              >
                <span>{currentCountry.countryName} 미션 이어하기</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>현재까지의 여행 이야기 유형</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{ending.title}</h2>
            <div className="text-xs font-medium text-slate-500">{ending.subtitle}</div>
            <p className="text-sm text-slate-600 leading-relaxed">{ending.summary}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="tabular-nums">{ending.highlight}</span>
            <button
              type="button"
              onClick={() => onNavigate('passport')}
              className="font-semibold text-teal-700 hover:underline cursor-pointer"
            >
              여권 보기
            </button>
          </div>
        </div>
      </div>

      {/* Recent Travel Records */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">최근 여행 기록</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Firebase Firestore에 저장된 최근 미션과 선택 결과입니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className="text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
          >
            전체 기록 보기
          </button>
        </div>

        {loadingRecords ? (
          <div className="py-8 text-center text-sm text-slate-500">여행 기록을 불러오는 중입니다...</div>
        ) : recentRecords.length === 0 ? (
          <div className="py-8 text-center space-y-3 bg-slate-50 rounded-xl border border-slate-200">
            <Award className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="text-sm text-slate-600">
              아직 완료한 여행 미션이 없습니다. 첫 출발지 프랑스에서 여행을 시작해 보세요!
            </p>
            <button
              type="button"
              onClick={() => onSelectCountryAndOpenMap('france')}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
            >
              프랑스 첫 미션 시작하기
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentRecords.map((rec) => {
              const country = COUNTRIES_BY_ID[rec.countryId];
              return (
                <div
                  key={rec.id || rec.missionId}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">
                      {country?.flag} {country?.countryName} · {rec.missionTitle}
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span>선택: {rec.selectedAnswer}</span>
                      <span aria-hidden="true">·</span>
                      <span>개념: {rec.learnedConcept}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium tabular-nums shrink-0">
                    <span className="text-teal-700">+{rec.scoreEarned}점</span>
                    <span className="text-sky-700">+{rec.experienceEarned} XP</span>
                    <span className="text-slate-400 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {rec.result}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
