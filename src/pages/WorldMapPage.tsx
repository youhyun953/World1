import { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  Compass,
  Globe2,
  Lock,
  Play,
  Settings2,
  Unlock,
} from 'lucide-react';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from '../data/countries';
import { getMissionsByCountry } from '../data/missions';
import { selectCurrentCountry, toggleUnlockAllMode } from '../services/gameService';
import { Country, Mission, TravelProgress } from '../types/game';
import { WorldMapSVG } from '../components/WorldMapSVG';

interface WorldMapPageProps {
  uid: string | null;
  progress: TravelProgress | null;
  selectedCountryId: string;
  onSelectCountryId: (id: string) => void;
  onStartMission: (country: Country, mission: Mission) => void;
  onRequireAuth: () => void;
}

const CONTINENTS = ['전체', '유럽', '아시아', '북아메리카', '아프리카'];

export function WorldMapPage({
  uid,
  progress,
  selectedCountryId,
  onSelectCountryId,
  onStartMission,
  onRequireAuth,
}: WorldMapPageProps) {
  const [continentFilter, setContinentFilter] = useState('전체');
  const [togglingUnlock, setTogglingUnlock] = useState(false);

  const unlockedList = progress?.unlockedCountries || ['france'];
  const visitedList = progress?.visitedCountries || [];
  const completedMissionIds = progress?.completedMissionIds || [];
  const unlockAllMode = progress?.unlockAllMode || false;

  const selectedCountry = COUNTRIES_BY_ID[selectedCountryId] || COUNTRIES_DATA[0];
  const countryMissions = getMissionsByCountry(selectedCountry.countryId);

  const isSelectedUnlocked =
    unlockAllMode || unlockedList.includes(selectedCountry.countryId);

  const filteredCountries =
    continentFilter === '전체'
      ? COUNTRIES_DATA
      : COUNTRIES_DATA.filter((c) => c.continent === continentFilter);

  const handleSelectCountry = async (countryId: string) => {
    onSelectCountryId(countryId);
    if (uid && (unlockAllMode || unlockedList.includes(countryId))) {
      selectCurrentCountry(uid, countryId).catch((err) => {
        console.warn('현재 국가 저장 실패:', err);
      });
    }
  };

  const handleToggleUnlockMode = async () => {
    if (!uid) {
      onRequireAuth();
      return;
    }
    setTogglingUnlock(true);
    try {
      await toggleUnlockAllMode(uid, !unlockAllMode);
    } finally {
      setTogglingUnlock(false);
    }
  };

  const geoMissions = countryMissions.filter((m) => m.missionType === 'geography');
  const psyMissions = countryMissions.filter((m) => m.missionType === 'psychology');
  const expMissions = countryMissions.filter((m) => m.missionType === 'exploration');

  const renderMissionList = (
    heading: string,
    icon: typeof Globe2,
    iconColor: string,
    list: Mission[]
  ) => {
    const Icon = icon;
    if (list.length === 0) return null;
    return (
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Icon className={`w-4 h-4 ${iconColor}`} aria-hidden="true" />
          <span>{heading}</span>
        </h4>
        <div className="space-y-2">
          {list.map((mission) => {
            const done = completedMissionIds.includes(mission.missionId);
            return (
              <div
                key={mission.missionId}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  done
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {done && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    )}
                    <span>{mission.title}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 tabular-nums">
                    <span>난이도 {mission.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>+{mission.rewards.score}점 / +{mission.rewards.experience} XP</span>
                    {done && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-medium">완료됨</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isSelectedUnlocked}
                  onClick={() => {
                    if (!uid) {
                      onRequireAuth();
                      return;
                    }
                    onStartMission(selectedCountry, mission);
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    done
                      ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{done ? '연습 모드' : '미션 시작'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      {/* Top Toolbar: Continent Filters & Unlock Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">세계지도 탐험</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            지도의 국가 핀을 클릭해 지리·문화 정보를 살펴보고 미션을 수행하세요.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Continent Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg overflow-x-auto">
            {CONTINENTS.map((cont) => (
              <button
                key={cont}
                type="button"
                onClick={() => setContinentFilter(cont)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  continentFilter === cont
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          {/* Unlock Condition Setting Toggle */}
          <button
            type="button"
            disabled={togglingUnlock}
            onClick={handleToggleUnlockMode}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              unlockAllMode
                ? 'bg-teal-50 text-teal-800 border-teal-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {unlockAllMode ? '자유 탐험 ON (전체 해금)' : '순차 해금 모드'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Map + Country Cards */}
      <WorldMapSVG
        countries={COUNTRIES_DATA}
        selectedCountryId={selectedCountry.countryId}
        unlockedCountries={unlockedList}
        visitedCountries={visitedList}
        unlockAllMode={unlockAllMode}
        continentFilter={continentFilter}
        onSelectCountry={handleSelectCountry}
      />

      {/* Quick Country Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {filteredCountries.map((country) => {
          const unlocked = unlockAllMode || unlockedList.includes(country.countryId);
          const visited = visitedList.includes(country.countryId);
          const active = selectedCountry.countryId === country.countryId;
          return (
            <button
              key={country.countryId}
              type="button"
              onClick={() => handleSelectCountry(country.countryId)}
              className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                active
                  ? 'border-teal-600 bg-teal-50/80 ring-1 ring-teal-600'
                  : unlocked
                  ? 'border-slate-200 bg-white hover:border-slate-300'
                  : 'border-slate-200 bg-slate-100/80 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between text-sm">
                <span>{country.flag}</span>
                {visited ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                ) : unlocked ? (
                  <Unlock className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                )}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                {country.countryName}
              </div>
              <div className="text-[11px] text-slate-500 truncate">{country.capital}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Country Geography & Mission Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Country Geography & Culture Brief */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
          {selectedCountry.countryId === 'france' && (
            <div className="h-44 overflow-hidden border-b border-slate-200">
              <img
                src="/src/assets/images/scene_paris_postcard_1794638626463.jpg"
                alt="프랑스 파리 풍경"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 space-y-5">
            <div className="space-y-1.5">
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                <span>{selectedCountry.continent}</span>
                <span aria-hidden="true">·</span>
                <span>수도 {selectedCountry.capital}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{selectedCountry.stampCode}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCountry.flag} {selectedCountry.countryName}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedCountry.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div>
                <div className="text-xs font-semibold text-slate-500">대표 도시</div>
                <div className="text-slate-800 mt-0.5">{selectedCountry.representativeCity}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">대표 관광지</div>
                <div className="text-slate-800 mt-0.5">{selectedCountry.landmarks.join(' · ')}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">기후 특성</div>
                <div className="text-slate-700 mt-0.5 leading-relaxed">{selectedCountry.climate}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">지형 특성</div>
                <div className="text-slate-700 mt-0.5 leading-relaxed">{selectedCountry.geography}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">문화적 특징</div>
                <div className="text-slate-700 mt-0.5 leading-relaxed">{selectedCountry.culture}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-2">
              <span>해금 조건: {selectedCountry.unlockCondition}</span>
              <span className="font-semibold text-slate-900 shrink-0">
                {isSelectedUnlocked ? '탐험 가능' : '잠김'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Missions List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedCountry.countryName} 여행 미션 ({countryMissions.length}개)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                미션을 1개 이상 완료하면 {selectedCountry.stampName}을 받고 다음 여행지가 열립니다.
              </p>
            </div>
            {!uid && (
              <button
                type="button"
                onClick={onRequireAuth}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
              >
                로그인하고 미션 시작
              </button>
            )}
          </div>

          {!isSelectedUnlocked ? (
            <div className="py-10 px-6 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <Lock className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
              <div className="text-base font-bold text-slate-800">
                아직 잠겨 있는 여행지입니다
              </div>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {selectedCountry.unlockCondition}하거나, 상단의 <strong>순차 해금 모드</strong> 버튼을 눌러 자유 탐험 모드로 전환할 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {renderMissionList('MISSION A · 지리 챌린지', Globe2, 'text-sky-600', geoMissions)}
              {renderMissionList('MISSION B · 심리학 선택', Brain, 'text-teal-600', psyMissions)}
              {renderMissionList('MISSION C · 여행 탐험', Compass, 'text-amber-600', expMissions)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
