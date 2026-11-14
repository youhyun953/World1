import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, Stamp } from 'lucide-react';
import passportBannerImg from '../assets/images/passport_desk_banner_1794638624919.jpg';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from '../data/countries';
import { getMissionsByCountry } from '../data/missions';
import { fetchUserGameRecords } from '../services/gameService';
import { GameRecord, TravelProgress, UserProfile } from '../types/game';

interface PassportPageProps {
  profile: UserProfile;
  progress: TravelProgress;
  onGoToCountry: (countryId: string) => void;
}

export function PassportPage({ profile, progress, onGoToCountry }: PassportPageProps) {
  const [selectedStampCountryId, setSelectedStampCountryId] = useState<string>(
    progress.collectedStamps[0] || 'france'
  );
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchUserGameRecords(profile.uid)
      .then((list) => {
        if (active) setRecords(list);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [profile.uid, progress.collectedStamps.length]);

  const selectedCountry =
    COUNTRIES_BY_ID[selectedStampCountryId] || COUNTRIES_DATA[0];
  const isCollected = progress.collectedStamps.includes(selectedCountry.countryId);
  const countryRecords = records.filter(
    (r) => r.countryId === selectedCountry.countryId
  );
  const totalMissionsInCountry = getMissionsByCountry(selectedCountry.countryId).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      {/* Passport Cover Banner */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 min-h-[180px] bg-slate-100">
          <img
            src={passportBannerImg}
            alt="여행자 여권과 도장 일러스트"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-teal-700 font-mono">
              WORLD TRAVELER PASSPORT · NO. {profile.uid.slice(0, 8).toUpperCase()}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {profile.nickname}님의 여행 여권
            </h1>
            <p className="text-sm text-slate-600">
              각 국가에서 미션을 1개 이상 완료하면 해당 국가의 고유 기념 도장이 컬러로 발급됩니다.
              도장을 클릭하면 방문 기록을 확인할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-sm">
            <div>
              <span className="text-slate-500 text-xs">수집한 도장</span>
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                {progress.collectedStamps.length} / {COUNTRIES_DATA.length}개
              </div>
            </div>
            <div>
              <span className="text-slate-500 text-xs">여행자 등급</span>
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                Lv.{profile.level}
              </div>
            </div>
            <div>
              <span className="text-slate-500 text-xs">누적 점수</span>
              <div className="text-lg font-bold text-slate-900 tabular-nums">
                {profile.totalScore.toLocaleString()}점
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stamps Grid + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">국가별 여행 도장 컬렉션</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {COUNTRIES_DATA.map((country) => {
              const collected = progress.collectedStamps.includes(country.countryId);
              const active = selectedStampCountryId === country.countryId;
              return (
                <button
                  key={country.countryId}
                  type="button"
                  onClick={() => setSelectedStampCountryId(country.countryId)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2.5 cursor-pointer ${
                    active
                      ? 'border-teal-600 ring-1 ring-teal-600 bg-teal-50/40'
                      : collected
                      ? 'border-slate-200 bg-white hover:border-slate-300'
                      : 'border-dashed border-slate-300 bg-slate-50/70 opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Circular Ink Stamp Visual */}
                  <div
                    className={`w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                      collected ? 'bg-white shadow-xs' : 'bg-slate-100 grayscale'
                    }`}
                    style={{
                      borderColor: collected ? country.stampAccent : '#94A3B8',
                      transform: collected ? 'rotate(-6deg)' : 'none',
                    }}
                  >
                    <span className="text-2xl leading-none">{country.flag}</span>
                    <span
                      className="text-[10px] font-mono font-bold mt-1"
                      style={{ color: collected ? country.stampAccent : '#64748B' }}
                    >
                      {country.stampCode}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-900">{country.countryName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {collected ? country.stampName : '미방문'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stamp Record Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-slate-500">{selectedCountry.stampCode}</div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedCountry.flag} {selectedCountry.countryName} · {selectedCountry.stampName}
              </h3>
            </div>
            {isCollected ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                발급 완료
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 shrink-0">
                <Lock className="w-4 h-4" aria-hidden="true" />
                미획득
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{selectedCountry.description}</p>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">이 국가의 여행 기록</span>
              <span className="text-slate-500 tabular-nums">
                {countryRecords.length} / {totalMissionsInCountry} 미션 완료
              </span>
            </div>

            {loading ? (
              <div className="py-6 text-center text-xs text-slate-500">기록 확인 중...</div>
            ) : countryRecords.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <Stamp className="w-6 h-6 text-slate-400 mx-auto" aria-hidden="true" />
                <p className="text-xs text-slate-600">
                  아직 {selectedCountry.countryName} 도장이 없습니다. 첫 미션을 완료해 도장을 수집해 보세요!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {countryRecords.map((rec) => (
                  <div
                    key={rec.id || rec.missionId}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs"
                  >
                    <div className="font-semibold text-slate-900">{rec.missionTitle}</div>
                    <div className="text-slate-600">선택: {rec.selectedAnswer}</div>
                    <div className="text-teal-700">학습: {rec.learnedConcept}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onGoToCountry(selectedCountry.countryId)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
          >
            <span>{selectedCountry.countryName} 탐험으로 이동</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
