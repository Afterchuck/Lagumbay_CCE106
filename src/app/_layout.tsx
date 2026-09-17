import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { EventMateProvider } from '@/context/event-mate-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={DefaultTheme}>
      <EventMateProvider>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="event/[id]" options={{ title: 'Event Details' }} />
          <Stack.Screen name="lab08" options={{ title: 'Lab 08 Attendance' }} />
        </Stack>
      </EventMateProvider>
    </ThemeProvider>
  );
}
