import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { courses } from '@/data/portal';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const courseId = Array.isArray(id) ? id[0] : id;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
  return (
    <MissingRoute
      title="Course not found"
      message="This course ID is not part of your current enrolment."
      onBack={() => router.replace('/')}
    />
  );
}

  return (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={[styles.banner, { borderTopColor: course.color }]}>
      <Text style={styles.code}>CLASS NOTEBOOK · {course.code}</Text>
      <Text style={styles.title}>{course.title}</Text>
    </View>

    <View style={styles.card}>
      <Detail label="Instructor" value={course.instructor} />
      <Detail label="Class Schedule" value={course.schedule} />
      <Detail label="Course Progress" value={course.progress} />
    </View>

    <View style={styles.notice}>
      <Text style={styles.noticeTitle}>Little reminder</Text>
      <Text style={styles.noticeText}>
        Review this week's module before the next class meeting.
      </Text>
    </View>

    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
    >
      <Text style={styles.backButtonText}>Back to courses</Text>
    </Pressable>
  </ScrollView>
);
}

interface DetailProps {
  label: string;
  value: string;
}

function Detail({ label, value }: DetailProps) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

interface MissingRouteProps {
  title: string;
  message: string;
  onBack: () => void;
}

function MissingRoute({ title, message, onBack }: MissingRouteProps) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{message}</Text>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>
          Return home
        </Text>
      </Pressable>
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
  banner: {
    gap: 6,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderTopWidth: 7,
    borderWidth: 1,
  },
  code: {
    color: '#275DAD',
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    color: '#25324A',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  detail: {
    gap: 5,
    padding: 16,
    borderBottomColor: '#EEE8DD',
    borderBottomWidth: 1,
  },
  detailLabel: {
    color: '#6D7280',
    fontSize: 13,
  },
  detailValue: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '700',
  },
  notice: {
    gap: 5,
    padding: 16,
    backgroundColor: '#FFF1C9',
    borderRadius: 8,
  },
  noticeTitle: {
    color: '#8C5A00',
    fontSize: 14,
    fontWeight: '800',
  },
  noticeText: {
    color: '#5C4813',
    fontSize: 14,
    lineHeight: 21,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    paddingHorizontal: 16,
    backgroundColor: '#275DAD',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
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
    lineHeight: 23,
    textAlign: 'center',
  },
});
