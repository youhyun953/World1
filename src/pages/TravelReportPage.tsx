import { ArrowRight, Award, BookOpen, Compass, Map, Sparkles, Unlock } from 'lucide-react';
import { COUNTRIES_BY_ID } from '../data/countries';
import { AppView, LastReportData, TravelProgress } from '../types/game';
import { evaluateTravelEnding } from '../utils/level';

interface TravelReportPageProps {
  report: LastReportData;
  progress: TravelProgress;
  totalScore: number;
  onNavigate: (view: AppView) => void;
  onContinueCountry: (countryId: string) => void;
}

export function TravelReportPage({
  report,
  progress,
  totalScore,
  onNavigate,
  onContinueCountry,
}: TravelReportPageProps) {
  const country = COUNTRIES_BY_ID[report.countryId];
  const unlockedCountry = report.newlyUnlockedCountryId
    ? COUNTRIES_BY_ID[report.newlyUnlockedCountryId]
    : null;
  const ending = evaluateTravelEnding(progress, totalScore);

  const deltaItems = [
    { label: '예산 변화', val: report.resourceDelta.budget, unit: '$' },
    { label: '시간 변화', val: report.resourceDelta.time, unit: '시간' },
    { label: '안전도 변화', val: report.resourceDelta.safety, unit: '%' },
    { label: '만족도 변화', val: report.resourceDelta.satisfaction, unit: '%' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12 space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-teal-700">
            TRAVEL REPORT · {country?.flag} {country?.countryName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {report.missionTitle} 결과 리포트
          </h1>
          <p className="text-sm text-slate-600">
            결과: <strong className="text-slate-900">{report.resultLabel}</strong>
          </p>
        </div>

        {/* Score & XP Reward Strip */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200">
            <div className="text-xs text-teal-800 font-medium">획득 점수</div>
            <div className="text-2xl font-bold text-teal-900 mt-1 tabular-nums">
              +{report.scoreEarned}점
            </div>
          </div>
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
            <div className="text-xs text-sky-800 font-medium">획득 경험치</div>
            <div className="text-2xl font-bold text-sky-900 mt-1 tabular-nums">
              +{report.experienceEarned} XP
            </div>
          </div>
        </div>

        {/* Level Up / Stamp / New Country Notices */}
        {(report.leveledUpTo || report.newlyEarnedStamp || unlockedCountry) && (
          <div className="space-y-3">
            {report.leveledUpTo && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                <div className="text-sm font-bold text-amber-950">
                  레벨 업 달성! Lv.{report.leveledUpTo} 등급에 도달했습니다.
                </div>
              </div>
            )}
            {report.newlyEarnedStamp && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <div className="text-sm font-bold text-emerald-950">
                  새 여권 도장 획득: {country?.flag} {report.newlyEarnedStamp}이 여권에 찍혔습니다!
                </div>
              </div>
            )}
            {unlockedCountry && (
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3">
                <Unlock className="w-5 h-5 text-sky-600 shrink-0" aria-hidden="true" />
                <div className="text-sm font-bold text-sky-950">
                  새 여행지 해금: {unlockedCountry.flag} {unlockedCountry.countryName}({unlockedCountry.capital}) 탐험이 열렸습니다!
                </div>
              </div>
            )}
          </div>
        )}

        {/* Resource Deltas */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">이번 선택으로 인한 여행 자원 변화</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {deltaItems.map((item) => {
              const sign = item.val > 0 ? '+' : '';
              return (
                <div key={item.label} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div
                    className={`text-base font-bold mt-1 tabular-nums ${
                      item.val > 0
                        ? 'text-emerald-700'
                        : item.val < 0
                        ? 'text-rose-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {item.unit === '$'
                      ? `${sign}$${item.val}`
                      : `${sign}${item.val}${item.unit}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Choice & Learned Concept */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-sm">
          <div>
            <span className="text-xs font-semibold text-slate-500">이번 여행에서 내린 선택: </span>
            <span className="font-medium text-slate-900">{report.selectedAnswer}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">학습한 핵심 개념: </span>
            <span className="font-medium text-teal-800">{report.learnedConcept}</span>
          </div>
        </div>

        {/* Current Ending Trajectory */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-1.5">
          <div className="text-xs font-semibold text-slate-500">현재 여행 이야기 흐름</div>
          <div className="text-base font-bold text-slate-900">{ending.title}</div>
          <p className="text-sm text-slate-600">{ending.summary}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onContinueCountry(report.countryId)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg cursor-pointer"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>{country?.countryName} 미션 계속하기</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Map className="w-4 h-4" aria-hidden="true" />
              <span>세계지도</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('passport')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg cursor-pointer"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>내 여권 도장 확인</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
