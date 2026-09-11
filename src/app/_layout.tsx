import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFDF7' },
        headerShadowVisible: false,
        headerTintColor: '#25324A',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#FFFDF7' },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="course/[id]" options={{ title: 'Course Details' }} />
      <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
      <Stack.Screen name="preferences" options={{ title: 'Preferences' }} />
    </Stack>
  );
}
