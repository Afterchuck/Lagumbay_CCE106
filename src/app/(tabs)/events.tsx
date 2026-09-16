import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { EventCard } from '@/components/EventCard';
import { useEventMate } from '@/context/event-mate-context';

const categories = ['All', 'Academic', 'Campus Life', 'Sports'] as const;

export default function EventsScreen() {
  const { events } = useEventMate();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleEvents = events.filter((event) => {
    const matchesCategory = category === 'All' || event.category === category;
    const matchesSearch = !normalizedQuery || [event.title, event.category, event.venue, event.dateTime]
      .some((value) => value.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>DISCOVER</Text>
      <Text style={styles.heading}>Campus Events</Text>
      <Text style={styles.subheading}>Find an activity that fits your schedule.</Text>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search events..."
        placeholderTextColor="#64748b"
        style={styles.searchInput}
        accessibilityLabel="Search campus events"
        clearButtonMode="while-editing"
      />

      <View style={styles.filters}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.filter, category === item && styles.selectedFilter]}
          >
            <Text style={[styles.filterText, category === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={visibleEvents}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => <EventCard event={item} onPress={() => router.push(`/event/${item.id}`)} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match your search.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f7fb',
    flex: 1,
    padding: 20,
  },
  eyebrow: { color: '#2563eb', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  heading: {
    color: '#172554',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  subheading: { color: '#64748b', fontSize: 15, marginBottom: 16, marginTop: 4 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filter: {
    backgroundColor: '#ffffff',
    borderColor: '#bfdbfe',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  filterText: { color: '#475569', fontWeight: '600' },
  selectedFilter: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  selectedText: {
    color: '#ffffff',
  },
  emptyText: { color: '#64748b', marginTop: 28, textAlign: 'center' },
});
