import { ArrowRight, BookOpen, Brain, Compass, Globe2, LogIn, Map, UserPlus } from 'lucide-react';
import compassEmblemImg from '../assets/images/traveler_compass_emblem_1794638625485.jpg';
import heroWorldTravelImg from '../assets/images/hero_world_travel_1794638624819.jpg';
import { AppView } from '../types/game';

interface LandingPageProps {
  isSignedIn: boolean;
  onStartGame: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigate: (view: AppView) => void;
}

export function LandingPage({
  isSignedIn,
  onStartGame,
  onOpenAuth,
  onNavigate,
}: LandingPageProps) {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={compassEmblemImg}
                  alt="세계 여행자의 선택 나침반 엠블럼"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs font-semibold text-teal-700 tracking-wide">
                  WORLD TRAVELER: THE CHOICE · 인터랙티브 지리·심리 어드벤처
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight text-balance">
                당신의 선택이 세계 여행의 이야기를 바꿉니다.
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                세계를 여행하고, 지리 지식을 발견하고, 선택으로 나만의 이야기를 만들어 보세요.
                프랑스 파리에서 시작해 4개 대륙 10개국을 탐험하며 각 지역의 기후·지형·문화를 배우고,
                예상치 못한 여행 상황 속 의사결정이 만드는 변화를 직접 경험합니다.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStartGame}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{isSignedIn ? '세계지도 탐험 이어하기' : '게임 시작하기'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                {!isSignedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenAuth('login')}
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <LogIn className="w-4 h-4" aria-hidden="true" />
                      <span>로그인</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenAuth('signup')}
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <UserPlus className="w-4 h-4" aria-hidden="true" />
                      <span>회원가입</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('dashboard')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>내 여행 대시보드</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-500">
                모든 여정과 여권 도장, 선택 기록은 Firebase 계정에 안전하게 저장되어 언제든 이어서 플레이할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 bg-sky-50 relative min-h-[280px]">
            <img
              src={heroWorldTravelImg}
              alt="여행 일지, 나침반, 여권과 세계지도가 놓인 탐험가의 책상"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/75 via-slate-900/30 to-transparent p-6 text-white">
              <div className="text-xs font-medium text-sky-200">
                첫 번째 출발지 · 프랑스 파리
              </div>
              <div className="text-lg font-bold mt-1">
                10개국 40개의 지리·심리 탐험 미션이 기다립니다
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Feature Summary Strip */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs text-slate-500 font-medium">탐험 대륙 및 국가</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">4대륙 · 10개국</div>
            <div className="text-xs text-slate-500 mt-1">유럽 · 아시아 · 북미 · 아프리카</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs text-slate-500 font-medium">초기 플레이 미션</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">40개 미션</div>
            <div className="text-xs text-slate-500 mt-1">프랑스 13개 집중 탐험 포함</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs text-slate-500 font-medium">실시간 자원 시뮬레이션</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">4가지 지표</div>
            <div className="text-xs text-slate-500 mt-1">예산 · 시간 · 안전도 · 만족도</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs text-slate-500 font-medium">수집 및 성장</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">여권 도장 · Lv.5</div>
            <div className="text-xs text-slate-500 mt-1">실시간 랭킹 및 기록 저장</div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">어떻게 여행을 진행하나요?</h2>
          <p className="text-sm text-slate-600 mt-1">
            단순한 정답 맞히기를 넘어 지리 지식과 의사결정 심리를 하나의 이야기로 연결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <Globe2 className="w-6 h-6 text-sky-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-900">01. 지리 챌린지 & 현장 탐험</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              인터랙티브 세계지도에서 국가를 고르고 수도, 강, 산맥, 기후 특성을 확인한 뒤 지도 위에서 직접 랜드마크를 찾아봅니다.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <Brain className="w-6 h-6 text-teal-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-900">02. 심리학적 선택 시나리오</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              길 잃음, 예산 고민, 문화적 오해 등 실제 여행 돌발 상황에서 나만의 결정을 내리고, 매몰 비용이나 사회적 지원 같은 심리 개념을 배웁니다.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <BookOpen className="w-6 h-6 text-amber-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-900">03. 나만의 여권 & 랭킹</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              방문한 국가마다 고유한 여권 도장을 모으고, 경험치로 레벨을 올리며 다른 세계 여행자들과 탐험 점수를 겨룹니다.
            </p>
          </div>
        </div>

        {/* Quick Destination Preview */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Map className="w-8 h-8 text-teal-600 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold text-slate-900">지금 바로 세계지도를 펼쳐 보세요</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                로그인 없이도 랭킹과 국가 지리 정보를 미리 둘러볼 수 있으며, 로그인 시 모든 기록이 저장됩니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>세계지도 둘러보기</span>
          </button>
        </div>
      </section>
    </div>
  );
}
