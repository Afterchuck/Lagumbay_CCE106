import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { API_BASE_URL, readResponse } from '@/utils/api';
import { readSessionToken, removeSessionToken, saveSessionToken } from '@/utils/session-storage';

export type Student = { name: string; email: string; studentNumber: string; program: string; yearLevel: string };
type AuthStatus = 'loading' | 'signedOut' | 'signedIn';
type AuthContextValue = {
  status: AuthStatus;
  student: Student | null;
  error: string | null;
  isBusy: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
  return readResponse<{ student: Student }>(response);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    void (async () => {
      const token = await readSessionToken().catch(() => null);
      if (!token) return setStatus('signedOut');
      try {
        const profile = await fetchProfile(token);
        setStudent(profile.student);
        setStatus('signedIn');
      } catch {
        await removeSessionToken().catch(() => undefined);
        setStatus('signedOut');
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const session = await readResponse<{ token: string }>(response);
      await saveSessionToken(session.token);
      const profile = await fetchProfile(session.token);
      setStudent(profile.student);
      setStatus('signedIn');
    } catch (caughtError) {
      await removeSessionToken().catch(() => undefined);
      setStudent(null);
      setStatus('signedOut');
      setError(caughtError instanceof TypeError
        ? 'Could not reach the student service. Start the development server and try again.'
        : caughtError instanceof Error ? caughtError.message : 'Sign in failed. Please try again.');
    } finally {
      setIsBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await removeSessionToken().catch(() => undefined);
    setStudent(null);
    setError(null);
    setStatus('signedOut');
  }, []);

  const value = useMemo(() => ({ status, student, error, isBusy, signIn, signOut }), [status, student, error, isBusy, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
