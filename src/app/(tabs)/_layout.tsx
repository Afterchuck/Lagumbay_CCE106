import { SymbolView } from 'expo-symbols';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open attendance list"
              onPress={() => router.push('/lab08')}
              style={({ pressed }) => [styles.attendanceButton, pressed && styles.pressed]}>
              <Text style={styles.attendanceButtonText}>Attendance</Text>
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'house', android: 'home', web: 'home' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }} tintColor={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <SymbolView name={{ ios: 'person', android: 'person', web: 'person' }} tintColor={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  attendanceButton: {
    backgroundColor: '#15803d',
    borderRadius: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  attendanceButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
