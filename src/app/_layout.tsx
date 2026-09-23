import { Stack } from 'expo-router';

import { AuthProvider } from '@/providers/auth-provider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="quotes" />
      </Stack>
    </AuthProvider>
  );
}
