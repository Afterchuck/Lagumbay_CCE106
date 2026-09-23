import Constants from 'expo-constants';
import { Platform } from 'react-native';

const metroHost = Constants.expoConfig?.hostUri?.split(':')[0];
const defaultHost = metroHost || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

export const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL || `http://${defaultHost}:3001`
).replace(/\/$/, '');

export async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as { error?: string } & T;
  if (!response.ok) throw new Error(body.error || `Request failed (${response.status}).`);
  return body;
}

