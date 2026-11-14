import { useEffect, useState } from 'react';
import { AlertTriangle, Volume2, VolumeX } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { MissionPlayer } from './components/MissionPlayer';
import { Navbar } from './components/Navbar';
import { COUNTRIES_BY_ID, COUNTRIES_DATA } from './data/countries';
import { FirebaseProvider, useAuth } from './hooks/useAuth';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { LandingPage } from './pages/LandingPage';
import { PassportPage } from './pages/PassportPage';
import { RankingPage } from './pages/RankingPage';
import { TravelReportPage } from './pages/TravelReportPage';
import { WorldMapPage } from './pages/WorldMapPage';
import { signOutUser } from './services/authService';
import { AppView, Country, LastReportData, Mission } from './types/game';
import { isSoundEnabled, setSoundEnabled } from './utils/sound';

function GameShell() {
  const { user, profile, progress, authReady, dataLoading, connectionError } = useAuth();

  const [view, setView] = useState<AppView>('landing');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('france');
  const [activeMission, setActiveMission] = useState<{
    country: Country;
    mission: Mission;
  } | null>(null);
  const [lastReport, setLastReport] = useState<LastReportData | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({
    open: false,
    mode: 'login',
  });
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());

  // Automatically direct authenticated users from landing to dashboard on initial login
  useEffect(() => {
    if (progress?.currentCountry && COUNTRIES_BY_ID[progress.currentCountry]) {
      setSelectedCountryId(progress.currentCountry);
    }
  }, [progress?.currentCountry]);

  const handleNavigate = (nextView: AppView) => {
    if (
      (nextView === 'dashboard' || nextView === 'passport' || nextView === 'history') &&
      !user
    ) {
      setAuthModal({ open: true, mode: 'login' });
      return;
    }
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGame = () => {
    if (user) {
      setView('map');
    } else {
      setAuthModal({ open: true, mode: 'signup' });
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setActiveMission(null);
    setLastReport(null);
    setView('landing');
  };

  const handleStartMission = (country: Country, mission: Mission) => {
    setActiveMission({ country, mission });
    setView('mission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMissionCompleted = (report: LastReportData) => {
    setLastReport(report);
    setView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-600">WORLD TRAVELER 여권을 확인하는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        currentView={view}
        onNavigate={handleNavigate}
        isSignedIn={!!user}
        nickname={profile?.nickname}
        level={profile?.level}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onSignOut={handleSignOut}
      />

      {connectionError && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{connectionError}</span>
          </div>
        </div>
      )}

      <main className="flex-1">
        {view === 'landing' && (
          <LandingPage
            isSignedIn={!!user}
            onStartGame={handleStartGame}
            onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
            onNavigate={handleNavigate}
          />
        )}

        {view === 'dashboard' && user && (
          dataLoading || !profile || !progress ? (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-slate-500">
              여행자 대시보드 데이터를 동기화하는 중입니다...
            </div>
          ) : (
            <DashboardPage
              profile={profile}
              progress={progress}
              onNavigate={handleNavigate}
              onSelectCountryAndOpenMap={(countryId) => {
                setSelectedCountryId(countryId);
                setView('map');
              }}
            />
          )
        )}

        {view === 'map' && (
          <WorldMapPage
            uid={user?.uid || null}
            progress={progress}
            selectedCountryId={selectedCountryId}
            onSelectCountryId={setSelectedCountryId}
            onStartMission={handleStartMission}
            onRequireAuth={() => setAuthModal({ open: true, mode: 'login' })}
          />
        )}

        {view === 'mission' && user && activeMission && (
          <div className="px-4 sm:px-6 py-8 pb-24 md:pb-12">
            <MissionPlayer
              uid={user.uid}
              country={activeMission.country}
              mission={activeMission.mission}
              alreadyCompleted={
                progress?.completedMissionIds.includes(activeMission.mission.missionId) ?? false
              }
              onBack={() => setView('map')}
              onCompleted={handleMissionCompleted}
            />
          </div>
        )}

        {view === 'report' && lastReport && progress && profile && (
          <TravelReportPage
            report={lastReport}
            progress={progress}
            totalScore={profile.totalScore}
            onNavigate={handleNavigate}
            onContinueCountry={(countryId) => {
              setSelectedCountryId(countryId);
              setView('map');
            }}
          />
        )}

        {view === 'passport' && user && profile && progress && (
          <PassportPage
            profile={profile}
            progress={progress}
            onGoToCountry={(countryId) => {
              setSelectedCountryId(countryId);
              setView('map');
            }}
          />
        )}

        {view === 'history' && user && profile && (
          <HistoryPage profile={profile} onGoToMap={() => setView('map')} />
        )}

        {view === 'ranking' && <RankingPage currentUserId={user?.uid || null} />}
      </main>

      {/* Quiet Footer with Real Sound Toggle */}
      <footer className="hidden md:block border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-slate-500">
          <span>WORLD TRAVELER: THE CHOICE · 세계 여행자의 선택 ({COUNTRIES_DATA.length}개국 탐험)</span>
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            )}
            <span>{soundOn ? '효과음 켜짐' : '효과음 꺼짐'}</span>
          </button>
        </div>
      </footer>

      <AuthModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
        onSuccess={() => {
          if (view === 'landing') {
            setView('dashboard');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <GameShell />
    </FirebaseProvider>
  );
}
