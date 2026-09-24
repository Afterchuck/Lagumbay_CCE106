import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'secure-profile-auth-token';

export async function saveToken(token) {
  if (Platform.OS !== 'web') await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return Platform.OS === 'web' ? null : SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  if (Platform.OS !== 'web') await SecureStore.deleteItemAsync(TOKEN_KEY);
}
