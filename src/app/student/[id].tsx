import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { student } from '@/data/portal';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const studentId = Array.isArray(id) ? id[0] : id;

  if (studentId !== student.id) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Student not found</Text>
      <Text style={styles.emptyText}>Check the student ID and try again.</Text>
      <Pressable onPress={() => router.replace('/profile')} style={styles.button}>
        <Text style={styles.buttonText}>
          Return to profile
        </Text>
      </Pressable>
    </View>
  );
}

return (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.hero}>
      <Text style={styles.heroLabel}>OFFICIAL STUDENT RECORD</Text>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.studentId}>{student.id}</Text>
    </View>

    <View style={styles.card}>
      <Record label="Program:" value={student.program} />
      <Record label="Year Level:" value={student.year} />
      <Record label="Instructor:" value={student.adviser} />
      <Record label="E-mail:" value={student.email} />
    </View>

    <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <Text style={styles.buttonText}>Back to profile</Text>
    </Pressable>
  </ScrollView>
);
}

interface RecordProps {
  label: string;
  value: string;
}

function Record({ label, value }: RecordProps) {
  return (
    <View style={styles.record}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFDF7',
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 32,
  },
  hero: {
    gap: 6,
    padding: 20,
    backgroundColor: '#DCEBFF',
    borderColor: '#B6D0F6',
    borderWidth: 1,
    borderRadius: 8,
  },
  heroLabel: {
    color: '#275DAD',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  name: {
    color: '#25324A',
    fontSize: 25,
    fontWeight: '800',
  },
  studentId: {
    color: '#4C5A70',
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  record: {
    gap: 5,
    padding: 16,
    borderBottomColor: '#EEE8DD',
    borderBottomWidth: 1,
  },
  label: {
    color: '#6D7280',
    fontSize: 13,
  },
  value: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
    backgroundColor: '#275DAD',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonPressed: {
    opacity: 0.74,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 28,
    backgroundColor: '#FFFDF7',
  },
  emptyTitle: {
    color: '#25324A',
    fontSize: 24,
    fontWeight: '800',
  },
  emptyText: {
    color: '#6D7280',
    fontSize: 16,
    textAlign: 'center',
  },
});
