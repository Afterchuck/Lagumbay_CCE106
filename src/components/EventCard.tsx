import { Pressable, StyleSheet, Text } from 'react-native';

import { type CampusEvent } from '@/context/event-mate-context';

type EventCardProps = {
  event: CampusEvent;
  onPress: () => void;
};

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.category}</Text>
      <Text>{event.dateTime}</Text>
      <Text>{event.venue}</Text>
      <Text style={event.joined ? styles.joined : styles.available}>
        {event.joined ? 'Joined' : `${event.availableSlots} slots available`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderColor: '#d1d5db', borderWidth: 1, borderRadius: 12, gap: 4, marginBottom: 12, padding: 16 },
  title: { fontSize: 18, fontWeight: '700' },
  joined: { color: '#15803d', fontWeight: '700' },
  available: { color: '#475569' },
});
