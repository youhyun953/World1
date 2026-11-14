import React, { useEffect, useState } from 'react';
import { AlertCircle, Compass, Mail, ShieldCheck, X } from 'lucide-react';
import { formatFriendlyFirebaseError } from '../firebase/errors';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showConsoleGuide, setShowConsoleGuide] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setShowConsoleGuide(false);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setShowConsoleGuide(false);

    if (!email.trim() || !password) {
      setErrorMsg('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }
    if (mode === 'signup') {
      if (password.length < 6) {
        setErrorMsg('비밀번호는 최소 6자 이상이어야 합니다.');
        return;
      }
      if (!nickname.trim()) {
        setErrorMsg('여권에 표시될 여행자 닉네임을 입력해 주세요.');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, nickname);
      } else {
        await signInWithEmail(email, password);
      }
      onSuccess();
      onClose();
    } catch (err) {
      const parsed = formatFriendlyFirebaseError(err);
      setErrorMsg(parsed.message);
      if (parsed.needsEmailAuthConsoleSetup) {
        setShowConsoleGuide(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setShowConsoleGuide(false);
    setLoading(true);
    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (err) {
      const parsed = formatFriendlyFirebaseError(err);
      setErrorMsg(parsed.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-600" aria-hidden="true" />
            <h2 id="auth-modal-title" className="text-lg font-bold text-slate-900">
              {mode === 'login' ? '여행자 로그인' : '새 여행 여권 발급 (회원가입)'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              className={`py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
              }}
              className={`py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 1-Click Google Login */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
            <span>Google 계정으로 바로 시작하기</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 whitespace-nowrap">
              또는 이메일 계정 사용
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label htmlFor="auth-nickname" className="block text-xs font-medium text-slate-700 mb-1">
                  여행자 닉네임
                </label>
                <input
                  id="auth-nickname"
                  type="text"
                  maxLength={30}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 파리탐험가"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-xs font-medium text-slate-700 mb-1">
                이메일
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@example.com"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-medium text-slate-700 mb-1">
                비밀번호 (6자 이상)
              </label>
              <input
                id="auth-password"
                type="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
                {showConsoleGuide && (
                  <div className="pl-6 text-[11px] text-rose-700 space-y-1">
                    <p className="font-semibold">이메일 로그인 활성화 방법:</p>
                    <p>1. Firebase Console 접속 → 현재 프로젝트 선택</p>
                    <p>2. Authentication → Sign-in method → 이메일/비밀번호 사용 설정</p>
                    <p>지금 바로 플레이하려면 위의 Google 로그인 버튼을 클릭해 주세요.</p>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>
                {loading
                  ? '처리 중...'
                  : mode === 'login'
                  ? '이메일로 로그인'
                  : '회원가입 및 여정 시작'}
              </span>
            </button>
          </form>

          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" aria-hidden="true" />
            <span>비밀번호는 Firebase Authentication에서 암호화되어 안전하게 관리됩니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
