import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { EventCard } from '@/components/EventCard';
import { useEventMate } from '@/context/event-mate-context';

const categories = ['All', 'Academic', 'Campus Life', 'Sports'] as const;

export default function EventsScreen() {
  const { events } = useEventMate();
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const visibleEvents = category === 'All' ? events : events.filter((event) => event.category === category);

  return (
  <View style={styles.container}>
    <Text style={styles.heading}>
      Campus Events
    </Text>

    <View style={styles.filters}>
      {categories.map((item) => (
        <Pressable
          key={item}
          onPress={() => setCategory(item)}
          style={[styles.filter, category === item && styles.selectedFilter]}
        >
          <Text style={category === item && styles.selectedText}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>

    <FlatList
      data={visibleEvents}
      keyExtractor={(event) => event.id}
      renderItem={({ item }) => (
        <EventCard 
          event={item} 
          onPress={() => router.push(`/event/${item.id}`)} 
        />
      )}
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  heading: { 
    fontSize: 26, 
    fontWeight: '800', 
    marginBottom: 12 
  },
  filters: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8, 
    marginBottom: 14 
  },
  filter: { 
    backgroundColor: '#e5e7eb', 
    borderRadius: 20, 
    paddingHorizontal: 12, 
    paddingVertical: 8 
  },
  selectedFilter: { 
    backgroundColor: '#1d4ed8' 
  },
  selectedText: { 
    color: '#ffffff', 
    fontWeight: '700' 
  },
});
