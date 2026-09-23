import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { API_BASE_URL, readResponse } from '@/utils/api';
import { readSessionToken, removeSessionToken, saveSessionToken } from '@/utils/session-storage';

export type Student = {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
  program: string;
  yearLevel: string;
};

type AuthStatus = 'restoring' | 'signedOut' | 'signedIn' | 'unavailable';
type LoginResponse = { token: string; expiresAt: string };
type AuthContextValue = {
  status: AuthStatus;
  student: Student | null;
  error: string | null;
  isBusy: boolean;
  sessionExpiresAt: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  retryRestore: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function errorStatus(error: unknown) {
  return typeof error === 'object' && error !== null && 'status' in error
    ? Number((error as { status: unknown }).status)
    : null;
}

async function fetchProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  return readResponse<{ student: Student; expiresAt: string }>(response);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('restoring');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<string | null>(null);

  const restoreSession = useCallback(async () => {
    let token: string | null;
    try {
      token = await readSessionToken();
    } catch {
      setStatus('unavailable');
      setError('Could not read the saved session. Please try again.');
      return;
    }
    if (!token) {
      setStudent(null);
      setSessionExpiresAt(null);
      setStatus('signedOut');
      return;
    }
    try {
      const profile = await fetchProfile(token);
      setStudent(profile.student);
      setSessionExpiresAt(profile.expiresAt);
      setStatus('signedIn');
    } catch (restoreError) {
      if (errorStatus(restoreError) === 401 || errorStatus(restoreError) === 403) {
      await removeSessionToken().catch(() => undefined);
        setStudent(null);
        setSessionExpiresAt(null);
        setStatus('signedOut');
        setError('Your session expired. Sign in again to continue.');
        return;
      }
      setStatus('unavailable');
      setError('Could not connect to the student service. Your saved session is still on this device.');
    }
  }, []);

  useEffect(() => {
    const restoreTimer = setTimeout(() => { void restoreSession(); }, 0);
    return () => clearTimeout(restoreTimer);
  }, [restoreSession]);

  const retryRestore = useCallback(async () => {
    setStatus('restoring');
    setError(null);
    await restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const session = await readResponse<LoginResponse>(response);
      await saveSessionToken(session.token);
      const profile = await fetchProfile(session.token);
      setStudent(profile.student);
      setSessionExpiresAt(profile.expiresAt || session.expiresAt);
      setStatus('signedIn');
    } catch (signInError) {
      const message = signInError instanceof Error ? signInError.message : 'Sign in failed. Please try again.';
      await removeSessionToken().catch(() => undefined);
      setStudent(null);
      setError(message);
      setStatus('signedOut');
    } finally {
      setIsBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsBusy(true);
    const token = await readSessionToken().catch(() => null);
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // Clear local credentials even if the server cannot be reached.
    } finally {
      await removeSessionToken().catch(() => undefined);
      setStudent(null);
      setSessionExpiresAt(null);
      setError(null);
      setStatus('signedOut');
      setIsBusy(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const token = await readSessionToken().catch(() => null);
    if (!token) {
      setStudent(null);
      setStatus('signedOut');
      return;
    }
    setIsBusy(true);
    setError(null);
    try {
      const profile = await fetchProfile(token);
      setStudent(profile.student);
      setSessionExpiresAt(profile.expiresAt);
    } catch (profileError) {
      if (errorStatus(profileError) === 401 || errorStatus(profileError) === 403) {
        await removeSessionToken().catch(() => undefined);
        setStudent(null);
        setSessionExpiresAt(null);
        setStatus('signedOut');
        setError('Your session expired. Sign in again to continue.');
      } else {
        setError('Could not refresh your profile. Check the server and try again.');
      }
    } finally {
      setIsBusy(false);
    }
  }, []);

  const value = useMemo(() => ({
    status,
    student,
    error,
    isBusy,
    sessionExpiresAt,
    signIn,
    signOut,
    retryRestore,
    refreshProfile,
  }), [status, student, error, isBusy, sessionExpiresAt, signIn, signOut, retryRestore, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
