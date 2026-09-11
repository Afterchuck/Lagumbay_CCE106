import { Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { student } from '@/data/portal';

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.studentCard}>
        <Text style={styles.cardLabel}>STUDENT PROFILE</Text>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JL</Text>
          </View>
          <View style={styles.identityText}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.program}>{student.program}</Text>
          </View>
        </View>
        <View style={styles.idRow}>
          <Text style={styles.idLabel}>Student ID</Text>
          <Text style={styles.idValue}>{student.id}</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <InfoRow label="Year Level:" value={student.year} />
        <InfoRow label="Instructor:" value={student.adviser} />
        <InfoRow label="E-mail:" value={student.email} />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({
            pathname: '/student/[id]',
            params: { id: student.id },
          } as unknown as Href)
        }
        style={({ pressed }) => [
          styles.detailButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.detailButtonText}>View Student Details</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f8f5',
  },
  content: {
    gap: 20,
    padding: 20,
    paddingBottom: 32,
  },
  studentCard: {
    backgroundColor: '#E9E1FF',
    borderColor: '#CFC1F7',
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 18,
  },
  cardLabel: { color: '#6E4BB3', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    backgroundColor: '#7957C5',
    borderRadius: 32,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  identityText: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#25324A',
    fontSize: 23,
    fontWeight: '800',
  },
  program: {
    color: '#5E5D72',
    fontSize: 14,
  },
  idRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFFAA',
    borderRadius: 8,
  },
  idLabel: {
    color: '#5E5D72',
    fontSize: 14,
    fontWeight: '600',
  },
  idValue: {
    color: '#25324A',
    fontSize: 16,
    fontWeight: '800',
  },
  infoBlock: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionTitle: {
    padding: 16,
    color: '#25324A',
    fontSize: 17,
    fontWeight: '800',
  },
  infoRow: {
    gap: 4,
    padding: 16,
    borderTopColor: '#EEE8DD',
    borderTopWidth: 1,
  },
  infoLabel: {
    color: '#6D7280',
    fontSize: 13,
  },
  infoValue: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  detailButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
    backgroundColor: '#275DAD',
    borderRadius: 8,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
