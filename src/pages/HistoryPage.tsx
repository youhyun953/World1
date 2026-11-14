import { useEffect, useState } from 'react';
import { Calendar, Compass } from 'lucide-react';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from '../data/countries';
import { fetchUserGameRecords } from '../services/gameService';
import { GameRecord, MissionType, UserProfile } from '../types/game';

interface HistoryPageProps {
  profile: UserProfile;
  onGoToMap: () => void;
}

const TYPE_LABELS: Record<'all' | MissionType, string> = {
  all: '전체 미션',
  geography: '지리 챌린지',
  psychology: '심리학 선택',
  exploration: '여행 탐험',
};

function formatPlayedAt(playedAt: unknown): string {
  if (!playedAt) return '방금 전';
  const ts = playedAt as { toDate?: () => Date; seconds?: number };
  const date = ts.toDate ? ts.toDate() : ts.seconds ? new Date(ts.seconds * 1000) : null;
  if (!date) return '기록 저장됨';
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HistoryPage({ profile, onGoToMap }: HistoryPageProps) {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | MissionType>('all');

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
  }, [profile.uid, profile.completedMissions]);

  const filtered = records.filter((rec) => {
    if (countryFilter !== 'all' && rec.countryId !== countryFilter) return false;
    if (typeFilter !== 'all' && rec.missionType !== typeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">나의 여행 기록</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            과거에 내린 선택, 자원 변화, 그리고 학습한 지리학·심리학 개념을 시간순으로 확인합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="국가별 필터"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
          >
            <option value="all">모든 국가</option>
            {COUNTRIES_DATA.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.flag} {c.countryName}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {(['all', 'geography', 'psychology', 'exploration'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  typeFilter === type
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-sm text-slate-500">
          Firestore에서 여행 기록을 불러오는 중입니다...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
          <Compass className="w-9 h-9 text-slate-400 mx-auto" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">표시할 여행 기록이 없습니다</h2>
            <p className="text-sm text-slate-600">
              세계지도에서 미션을 완료하면 이곳에 모든 선택과 학습 내용이 자동으로 기록됩니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onGoToMap}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
          >
            세계지도로 이동
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((rec) => {
            const country = COUNTRIES_BY_ID[rec.countryId];
            return (
              <div
                key={rec.id || rec.missionId}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-800">
                      {country?.flag} {country?.countryName} ({country?.capital})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{TYPE_LABELS[rec.missionType]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {formatPlayedAt(rec.playedAt)}
                    </span>
                  </div>

                  <div className="text-xs font-bold tabular-nums flex items-center gap-3">
                    <span className="text-teal-700">+{rec.scoreEarned}점</span>
                    <span className="text-sky-700">+{rec.experienceEarned} XP</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">{rec.missionTitle}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 font-medium">내가 선택한 답변</div>
                    <div className="text-slate-900 font-semibold mt-1">{rec.selectedAnswer}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-slate-500 font-medium">여행 결과 및 자원 변화</div>
                    <div className="text-slate-900 font-semibold mt-1">{rec.result}</div>
                    <div className="text-slate-600 mt-1 tabular-nums">
                      예산 {rec.budgetChange >= 0 ? `+${rec.budgetChange}` : rec.budgetChange} · 시간{' '}
                      {rec.timeChange >= 0 ? `+${rec.timeChange}` : rec.timeChange}h · 안전{' '}
                      {rec.safetyChange >= 0 ? `+${rec.safetyChange}` : rec.safetyChange}% · 만족{' '}
                      {rec.satisfactionChange >= 0
                        ? `+${rec.satisfactionChange}`
                        : rec.satisfactionChange}
                      %
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200">
                    <div className="text-teal-800 font-medium">학습한 지리·심리 개념</div>
                    <div className="text-slate-900 font-semibold mt-1">{rec.learnedConcept}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
