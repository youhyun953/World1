import { useEffect, useState } from 'react';
import { Medal, RefreshCw, Trophy } from 'lucide-react';
import { fetchLeaderboard } from '../services/gameService';
import { RankingEntry } from '../types/game';

interface RankingPageProps {
  currentUserId: string | null;
}

type SortKey =
  | 'totalScore'
  | 'completedMissionCount'
  | 'visitedCountryCount'
  | 'stampCount';

const SORT_TABS: { key: SortKey; label: string }[] = [
  { key: 'totalScore', label: '총 누적 점수' },
  { key: 'completedMissionCount', label: '완료한 미션 수' },
  { key: 'visitedCountryCount', label: '방문한 국가 수' },
  { key: 'stampCount', label: '여행 도장 수' },
];

export function RankingPage({ currentUserId }: RankingPageProps) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('totalScore');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadRankings = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const list = await fetchLeaderboard();
      setEntries(list);
    } catch (err) {
      console.error('랭킹 로드 오류:', err);
      setErrorMsg('랭킹 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRankings();
  }, []);

  const sorted = [...entries].sort((a, b) => {
    const diff = (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
    if (diff !== 0) return diff;
    return (b.totalScore ?? 0) - (a.totalScore ?? 0);
  });

  const myRankIndex = currentUserId
    ? sorted.findIndex((e) => e.userId === currentUserId)
    : -1;
  const myEntry = myRankIndex >= 0 ? sorted[myRankIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">세계 여행자 랭킹</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Firebase Firestore에 저장된 실제 플레이 데이터를 기준으로 실시간 순위를 산출합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg overflow-x-auto">
            {SORT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSortBy(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  sortBy === tab.key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={loadRankings}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>새로고침</span>
          </button>
        </div>
      </div>

      {/* My Current Rank Highlight */}
      {myEntry && (
        <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-7 h-7 text-teal-700 shrink-0" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold text-teal-800">나의 현재 순위</div>
              <div className="text-lg font-bold text-slate-900">
                {myRankIndex + 1}위 · {myEntry.nickname} (Lv.{myEntry.level})
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm tabular-nums">
            <div>
              <div className="text-xs text-slate-500">누적 점수</div>
              <div className="font-bold text-slate-900">{myEntry.totalScore.toLocaleString()}점</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">완료 미션</div>
              <div className="font-bold text-slate-900">{myEntry.completedMissionCount}개</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">방문 국가</div>
              <div className="font-bold text-slate-900">{myEntry.visitedCountryCount}개국</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">여권 도장</div>
              <div className="font-bold text-slate-900">{myEntry.stampCount}개</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {errorMsg ? (
          <div className="p-8 text-center text-sm text-rose-700">{errorMsg}</div>
        ) : loading ? (
          <div className="p-12 text-center text-sm text-slate-500">랭킹을 집계하는 중입니다...</div>
        ) : sorted.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            아직 등록된 여행자 랭킹이 없습니다. 첫 번째 미션을 완료해 보세요!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-4 w-16">순위</th>
                  <th className="py-3.5 px-4">여행자 닉네임</th>
                  <th className="py-3.5 px-4 text-right">레벨</th>
                  <th className="py-3.5 px-4 text-right">누적 점수</th>
                  <th className="py-3.5 px-4 text-right">완료 미션</th>
                  <th className="py-3.5 px-4 text-right">방문 국가</th>
                  <th className="py-3.5 px-4 text-right">여권 도장</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {sorted.map((entry, idx) => {
                  const isMe = entry.userId === currentUserId;
                  return (
                    <tr
                      key={entry.userId}
                      className={isMe ? 'bg-teal-50/50 font-semibold' : 'hover:bg-slate-50/60'}
                    >
                      <td className="py-3.5 px-4 tabular-nums">
                        <span className="inline-flex items-center gap-1.5">
                          {idx < 3 && (
                            <Medal
                              className={`w-4 h-4 ${
                                idx === 0
                                  ? 'text-amber-500'
                                  : idx === 1
                                  ? 'text-slate-400'
                                  : 'text-amber-700'
                              }`}
                              aria-hidden="true"
                            />
                          )}
                          <span>{idx + 1}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-900">
                        {entry.nickname}
                        {isMe && <span className="ml-2 text-xs text-teal-700">(나)</span>}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">
                        Lv.{entry.level}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold text-slate-900">
                        {entry.totalScore.toLocaleString()}점
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">
                        {entry.completedMissionCount}개
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">
                        {entry.visitedCountryCount}개국
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">
                        {entry.stampCount}개
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
