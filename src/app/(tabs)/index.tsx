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
      <Text style={styles.title}>
        EventMate
      </Text>

      <Text style={styles.welcome}>
        Welcome back, {studentName}!
      </Text>

      <Text style={styles.sectionTitle}>
        Your campus at a glance
      </Text>

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
          <Text style={styles.buttonText}>
            Browse Events
          </Text>
        </Pressable>
      </Link>
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  scrollContent: { 
    flexGrow: 1, 
    padding: 20 
  },
  container: { 
    alignSelf: 'center', 
    gap: 14, 
    maxWidth: 900, 
    width: '100%' 
  },
  title: { 
    color: '#1d4ed8', 
    fontSize: 32, 
    fontWeight: '800' 
  },
  welcome: { 
    fontSize: 18 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginTop: 12 
  },
  stats: { 
    gap: 10 
  },
  wideStats: { 
    flexDirection: 'row' 
  },
  wideCard: { 
    flex: 1 
  },
  button: { 
    alignItems: 'center', 
    backgroundColor: '#1d4ed8', 
    borderRadius: 10, 
    marginTop: 12, 
    padding: 14,
  },
  buttonText: { 
    color: '#1d4ed8', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  pressed: { 
    opacity: 0.7

  },
});
