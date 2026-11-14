import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, testFirestoreConnection } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { ensureUserDocuments } from '../services/authService';
import { seedInitialCatalogIfMissing } from '../services/gameService';
import { TravelProgress, UserProfile } from '../types/game';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  progress: TravelProgress | null;
  authReady: boolean;
  dataLoading: boolean;
  connectionError: string | null;
  refreshCatalog: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  progress: null,
  authReady: false,
  dataLoading: true,
  connectionError: null,
  refreshCatalog: async () => {},
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<TravelProgress | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    testFirestoreConnection().then((res) => {
      if (!res.ok && res.error) {
        setConnectionError(res.error);
      }
    });
  }, []);

  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let unsubProgress: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }
      if (unsubProgress) {
        unsubProgress();
        unsubProgress = null;
      }

      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setProgress(null);
        setAuthReady(true);
        setDataLoading(false);
        return;
      }

      setDataLoading(true);
      try {
        await ensureUserDocuments(firebaseUser);
        // Seed initial countries & missions catalog quietly once signed in
        seedInitialCatalogIfMissing().catch((err) => {
          console.warn('Catalog seed notice:', err);
        });

        const uid = firebaseUser.uid;
        unsubProfile = onSnapshot(
          doc(db, 'users', uid),
          (snap) => {
            if (snap.exists()) {
              setProfile(snap.data() as UserProfile);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, `users/${uid}`);
          }
        );

        unsubProgress = onSnapshot(
          doc(db, 'travelProgress', uid),
          (snap) => {
            if (snap.exists()) {
              setProgress(snap.data() as TravelProgress);
            }
            setDataLoading(false);
          },
          (error) => {
            setDataLoading(false);
            handleFirestoreError(error, OperationType.GET, `travelProgress/${uid}`);
          }
        );
      } catch (err) {
        console.error('Failed to initialize user state:', err);
        setConnectionError(
          '사용자 데이터를 불러오는 중 문제가 발생했습니다. 네트워크 또는 Firebase 연결 상태를 확인해 주세요.'
        );
        setDataLoading(false);
      } finally {
        setAuthReady(true);
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
      if (unsubProgress) unsubProgress();
    };
  }, []);

  const refreshCatalog = async () => {
    await seedInitialCatalogIfMissing();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        progress,
        authReady,
        dataLoading,
        connectionError,
        refreshCatalog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
