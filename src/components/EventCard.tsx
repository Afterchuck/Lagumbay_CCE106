import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type CampusEvent } from '@/context/event-mate-context';

type EventCardProps = {
  event: CampusEvent;
  onPress: () => void;
};

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={event.joined ? styles.joined : styles.available}>
          {event.joined ? 'Joined' : `${event.availableSlots} slots left`}
        </Text>
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>{event.dateTime}</Text>
      <Text style={styles.details}>{event.venue}</Text>
      <Text style={styles.viewAction}>View event details →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderColor: '#dbeafe', borderWidth: 1, borderRadius: 14, gap: 6, marginBottom: 12, padding: 16 },
  cardHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  category: { backgroundColor: '#dbeafe', borderRadius: 20, color: '#1d4ed8', fontSize: 12, fontWeight: '800', overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 5 },
  title: { color: '#172554', fontSize: 18, fontWeight: '800', marginTop: 4 },
  details: { color: '#64748b', fontSize: 14 },
  joined: { color: '#15803d', fontSize: 13, fontWeight: '700' },
  available: { color: '#2563eb', fontSize: 13, fontWeight: '700' },
  viewAction: { color: '#1d4ed8', fontSize: 13, fontWeight: '700', marginTop: 2 },
});
