import { BookOpen, Compass, History, LayoutDashboard, Map, Trophy } from 'lucide-react';
import { AppView } from '../types/game';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isSignedIn: boolean;
  nickname?: string;
  level?: number;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onSignOut: () => void;
}

const NAV_ITEMS: { id: AppView; label: string; shortLabel: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: '대시보드', shortLabel: '대시보드', icon: LayoutDashboard },
  { id: 'map', label: '세계지도', shortLabel: '지도', icon: Map },
  { id: 'passport', label: '여행 여권', shortLabel: '여권', icon: BookOpen },
  { id: 'history', label: '여행 기록', shortLabel: '기록', icon: History },
  { id: 'ranking', label: '랭킹', shortLabel: '랭킹', icon: Trophy },
];

export function Navbar({
  currentView,
  onNavigate,
  isSignedIn,
  nickname,
  level,
  onOpenAuth,
  onSignOut,
}: NavbarProps) {
  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate(isSignedIn ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-md cursor-pointer"
          >
            <Compass className="w-5 h-5 text-teal-600 shrink-0" aria-hidden="true" />
            <span className="font-display">WORLD TRAVELER</span>
          </button>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {NAV_ITEMS.map((item) => {
              const active =
                currentView === item.id ||
                ((currentView === 'mission' || currentView === 'report') && item.id === 'map');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border-teal-600 text-teal-700 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            {isSignedIn ? (
              <button
                type="button"
                onClick={onSignOut}
                title={`${nickname || '여행자'} (Lv.${level ?? 1}) 로그아웃`}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {nickname ? `${nickname} · 로그아웃` : '로그아웃'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                로그인 / 시작
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (compact <= 60px) */}
      <nav
        aria-label="모바일 탐색 메뉴"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-2 h-15 flex items-center justify-around"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            currentView === item.id ||
            ((currentView === 'mission' || currentView === 'report') && item.id === 'map');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                active ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[11px] mt-0.5 whitespace-nowrap">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
