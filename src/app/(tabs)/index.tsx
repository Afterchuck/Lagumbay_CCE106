import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { StatCard } from '@/components/StatCard';
import { useEventMate } from '@/context/event-mate-context';

export default function HomeScreen() {
  const { events, studentName } = useEventMate();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 700;
  const joined = events.filter((event) => event.joined).length;
  const available = events.reduce((total, event) => total + event.availableSlots, 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>CAMPUS COMMUNITY</Text>
          <Text style={styles.title}>EventMate</Text>
          <Text style={styles.welcome}>Welcome back, {studentName}!</Text>
          <Text style={styles.heroMessage}>Stay updated with the activities happening around campus.</Text>
        </View>

        <Text style={styles.sectionTitle}>Campus Event Overview:</Text>

      <View style={[styles.stats, isWideScreen && styles.wideStats]}>
        <StatCard 
          label="Total Events" 
          value={events.length} 
          style={isWideScreen ? styles.wideCard : undefined} 
        />
        <StatCard 
          label="Joined Events" 
          value={joined} 
          style={isWideScreen ? styles.wideCard : undefined} 
        />
        <StatCard 
          label="Available Slots" 
          value={available} 
          style={isWideScreen ? styles.wideCard : undefined} 
        />
      </View>

        <Link href="/events" asChild>
          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>Browse Events</Text>
          </Pressable>
        </Link>

        <Link href="/lab08" asChild>
          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => [styles.attendanceButton, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>Open Attendance List</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#f4f7fb',
    flexGrow: 1,
    padding: 20,
  },
  container: {
    alignSelf: 'center',
    gap: 18,
    maxWidth: 900,
    width: '100%',
  },
  heroCard: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    padding: 24,
  },
  eyebrow: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 6,
  },
  welcome: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
  },
  heroMessage: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#172554',
    fontSize: 19,
    fontWeight: '800',
  },
  stats: {
    gap: 12,
  },
  wideStats: {
    flexDirection: 'row',
  },
  wideCard: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    marginTop: 4,
    padding: 14,
  },
  attendanceButton: {
    alignItems: 'center',
    backgroundColor: '#15803d',
    borderRadius: 12,
    padding: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
