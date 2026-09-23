import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'quoteapp.student.session';

export async function readSessionToken() {
  return Platform.OS === 'web'
    ? (typeof window === 'undefined' ? null : window.sessionStorage.getItem(SESSION_KEY))
    : SecureStore.getItemAsync(SESSION_KEY);
}

export async function saveSessionToken(token: string) {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.sessionStorage.setItem(SESSION_KEY, token);
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, token);
}

export async function removeSessionToken() {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.sessionStorage.removeItem(SESSION_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
