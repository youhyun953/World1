import { Clock, Heart, RotateCcw, Shield, Wallet } from 'lucide-react';
import { TravelProgress } from '../types/game';

interface ResourceHUDProps {
  progress: TravelProgress;
  onReplenish?: () => void;
  replenishing?: boolean;
}

export function ResourceHUD({ progress, onReplenish, replenishing }: ResourceHUDProps) {
  const needsRestock =
    progress.totalBudget < 400 ||
    progress.totalTravelTime < 20 ||
    progress.safety < 35 ||
    progress.satisfaction < 35;

  const items = [
    {
      label: '여행 예산',
      value: `$${progress.totalBudget.toLocaleString()}`,
      percent: Math.min(100, Math.round((progress.totalBudget / 3500) * 100)),
      status: progress.totalBudget < 400 ? '부족 주의' : '여유',
      colorClass: progress.totalBudget < 400 ? 'bg-rose-500' : 'bg-teal-600',
      icon: Wallet,
    },
    {
      label: '남은 시간',
      value: `${progress.totalTravelTime}시간`,
      percent: Math.min(100, Math.round((progress.totalTravelTime / 150) * 100)),
      status: progress.totalTravelTime < 20 ? '촉박함' : '안정',
      colorClass: progress.totalTravelTime < 20 ? 'bg-amber-500' : 'bg-sky-600',
      icon: Clock,
    },
    {
      label: '안전도',
      value: `${progress.safety}%`,
      percent: progress.safety,
      status: progress.safety < 45 ? '주의 필요' : '안전',
      colorClass: progress.safety < 45 ? 'bg-rose-500' : 'bg-emerald-600',
      icon: Shield,
    },
    {
      label: '여행 만족도',
      value: `${progress.satisfaction}%`,
      percent: progress.satisfaction,
      status: progress.satisfaction < 45 ? '회복 필요' : '긍정적',
      colorClass: progress.satisfaction < 45 ? 'bg-amber-500' : 'bg-teal-600',
      icon: Heart,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">현재 여행 자원 상태</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            선택형 미션의 결정에 따라 예산·시간·안전도·만족도가 실시간으로 변화합니다.
          </p>
        </div>
        {onReplenish && (
          <button
            type="button"
            disabled={replenishing}
            onClick={onReplenish}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              needsRestock
                ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{replenishing ? '재정비 중...' : '여정 자원 재충전'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                  <Icon className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="text-slate-500">{item.status}</span>
              </div>
              <div className="text-lg font-bold text-slate-900 tabular-nums">{item.value}</div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${item.colorClass}`}
                  style={{ width: `${Math.max(4, item.percent)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
