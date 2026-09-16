import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useEventMate } from '@/context/event-mate-context';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events, toggleJoined } = useEventMate();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.description}>We could not find an event with ID “{id ?? 'unknown'}”.</Text>
        <Pressable style={styles.actionButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
          <Text style={styles.actionText}>{router.canGoBack() ? 'Go Back' : 'Go Home'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <Stack.Screen options={{ title: event.title }} />

    <View style={styles.container}>
      <Text style={styles.category}>
        {event.category}
      </Text>

      <Text style={styles.title}>
        {event.title}
      </Text>

      <Text style={styles.description}>
        When: {event.dateTime}
      </Text>

      <Text style={styles.description}>
        Where: {event.venue}
      </Text>

      <Text style={styles.description}>
        Available slots: {event.availableSlots}
      </Text>

      <Text style={event.joined ? styles.joinedStatus : styles.availableStatus}>
        {event.joined ? 'You have joined this event.' : 'You have not joined this event yet.'}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => toggleJoined(event.id)}
        style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
      >
        <Text style={styles.actionText}>
          {event.joined ? 'Leave Event' : 'Join Event'}
        </Text>
      </Pressable>
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
    gap: 16, 
    maxWidth: 680, 
    width: '100%' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700' 
  },
  description: { 
    fontSize: 16 
  },
  category: { 
    color: '#1d4ed8', 
    fontWeight: '700', 
    textTransform: 'uppercase' 
  },
  joinedStatus: { 
    color: '#15803d', 
    fontWeight: '700' 
  },
  availableStatus: { 
    color: '#475569', 
    fontWeight: '600' 
  },
  actionButton: { 
    alignItems: 'center', 
    backgroundColor: '#1d4ed8', 
    borderRadius: 10, 
    padding: 14 
  },
  actionText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  pressed: { 
    opacity: 0.7 
  },
});
