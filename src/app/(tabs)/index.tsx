import { Href, Link } from 'expo-router';
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { courses, student, type Course } from '@/data/portal';

type MetricTone = 'blue' | 'teal' | 'gold';

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  tone: MetricTone;
  compact: boolean;
}

const activity = [
  {
    title: 'Module 8 marked complete',
    detail: 'Application Development',
    time: 'Today, 9:42 AM',
  },
  {
    title: 'Networking quiz is available',
    detail: 'IT11/L - Networking 2',
    time: 'Yesterday',
  },
  {
    title: 'New course material posted',
    detail: 'Systems Integration & Architecture',
    time: 'Sep 8',
  },
];

const tokens = {
  color: {
    background: '#F9F8F5',
    ink: '#25324A',
    body: '#4C5A70',
    muted: '#6D7280',
    surface: '#FFFFFF',
    border: '#E5DED2',
    divider: '#EEE8DD',
    primary: '#275DAD',
    primaryPressed: '#1D4E91',
    primarySurface: '#DCEBFF',
    primaryBorder: '#B6D0F6',
    onPrimary: '#d9cece',
    goldSurface: '#FFE8A3',
    tealSurface: '#D8F3E7',
    teal: '#0F8A9D',
    coursePressedSurface: '#EEF5FF',
    coursePressedBorder: '#8FB8ED',
  },
  space: { small: 10, medium: 14, large: 18 },
  radius: 14,
};

function MetricCard({ label, value, detail, tone, compact }: MetricCardProps) {
  return (
    <View
      style={[
        styles.metricCard,
        styles[`metric${tone}`],
        compact && styles.metricCardCompact,
      ]}
    >
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDetail}>{detail}</Text>
    </View>
  );
}

function DashboardSectionHeader({ title, note }: { title: string; note: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionNote}>{note}</Text>
    </View>
  );
}

function CourseCard({ course }: { course: Course }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 5,
    }).start();
  };

  return (
    <Link
      href={
        {
          pathname: '/course/[id]',
          params: { id: course.id },
        } as unknown as Href
      }
      asChild
    >
      <Pressable
        accessibilityLabel={`Open ${course.title}`}
        onPressIn={() => animateTo(0.985)}
        onPressOut={() => animateTo(1)}
        style={styles.coursePressable}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              styles.course,
              pressed && styles.coursePressed,
              { transform: [{ scale }] },
            ]}
          >
            <View style={styles.courseText}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseMeta}>{course.schedule}</Text>
            </View>
            <Text style={styles.viewButton}>Open</Text>
          </Animated.View>
        )}
      </Pressable>
    </Link>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const compactMetrics = width < 500;
  const narrowLayout = width < 380;
  const firstName = student.name.split(' ')[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.content, narrowLayout && styles.contentNarrow]}>
        {/* Welcome Banner */}
        <View style={styles.welcome}>
          <Text style={styles.eyebrow}>STUDENT PORTAL</Text>
          <Text style={styles.title}>Hello, {firstName}</Text>
          <Text style={styles.subtitle}>
            Here is a clear view of your coursework this week.
          </Text>
        </View>

        {/* Metrics Section */}
        <View style={styles.metrics}>
          <MetricCard
            label="ACTIVE COURSES"
            value="3"
            detail="This semester"
            tone="blue"
            compact={compactMetrics}
          />
          <MetricCard
            label="DUE THIS WEEK"
            value="2"
            detail="Keep them moving"
            tone="gold"
            compact={compactMetrics}
          />
          <MetricCard
            label="MODULES DONE"
            value="21"
            detail="Across all courses"
            tone="teal"
            compact={compactMetrics}
          />
        </View>

        {/* Quick Actions */}
        <DashboardSectionHeader
          title="Quick actions"
          note="Take care of what is next."
        />

        <View style={styles.actionRow}>
          <Link href="/course/cce106" asChild>
            <Pressable
              android_ripple={{ color: tokens.color.primaryPressed }}
              style={({ pressed }) => [
                styles.primaryAction,
                pressed && styles.actionPressed,
              ]}
            >
              <Text style={styles.primaryActionText}>
                Continue learning
              </Text>
              <Text style={styles.primaryActionHint}>
                CCE106, Module 2
              </Text>
            </Pressable>
          </Link>

          <Link href="/preferences" asChild>
            <Pressable
              android_ripple={{ color: tokens.color.primaryBorder }}
              style={({ pressed }) => [
                styles.secondaryAction,
                pressed && styles.actionPressed,
              ]}
            >
              <Text style={styles.secondaryActionText}>Review reminders</Text>
              <Text style={styles.secondaryActionHint}>
                2 notifications active
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Recent Activity */}
        <DashboardSectionHeader
          title="Recent activity"
          note="The latest updates from your classes."
        />

        <View style={styles.activityList}>
          {activity.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.activityRow,
                index > 0 && styles.activityBorder,
              ]}
            >
              <View style={styles.activityMarker} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDetail}>{item.detail}</Text>
              </View>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        {/* Courses Section */}
        <DashboardSectionHeader
          title="Courses"
          note="Open a class to check your progress and notes."
        />

        <View style={styles.courseList}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Layout & Container
  screen: {
    flex: 1,
    backgroundColor: tokens.color.background,
  },
  scrollContent: {
    alignItems: 'center',
    padding: tokens.space.large,
    paddingBottom: 32,
  },
  content: {
    width: '100%',
    maxWidth: 800,
    gap: tokens.space.large,
  },
  contentNarrow: {
    gap: tokens.space.medium,
  },

  // Welcome Header
  welcome: {
    gap: 7,
    padding: 18,
    backgroundColor: tokens.color.primarySurface,
    borderColor: tokens.color.primaryBorder,
    borderRadius: 8,
    borderWidth: 1,
  },
  eyebrow: {
    color: tokens.color.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: tokens.color.ink,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: tokens.color.body,
    fontSize: 15,
    lineHeight: 22,
  },

  // Metrics Section
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flexBasis: 190,
    flexGrow: 1,
    gap: 4,
    minHeight: 130,
    padding: 16,
    borderRadius: 8,
  },
  metricCardCompact: {
    flexBasis: '100%',
  },
  metricblue: {
    backgroundColor: tokens.color.primarySurface,
  },
  metricgold: {
    backgroundColor: tokens.color.goldSurface,
  },
  metricteal: {
    backgroundColor: tokens.color.tealSurface,
  },
  metricLabel: {
    color: tokens.color.body,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  metricValue: {
    marginTop: 6,
    color: tokens.color.ink,
    fontSize: 32,
    fontWeight: '800',
  },
  metricDetail: {
    color: tokens.color.body,
    fontSize: 13,
    lineHeight: 18,
  },

  // Section Headers
  sectionHeader: {
    gap: 4,
    marginTop: 4,
  },
  sectionTitle: {
    color: tokens.color.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  sectionNote: {
    color: tokens.color.muted,
    fontSize: 14,
    lineHeight: 20,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: tokens.space.medium,
  },
  primaryAction: {
    justifyContent: 'center',
    flexBasis: 240,
    flexGrow: 1,
    minWidth: 0,
    gap: 4,
    minHeight: 86,
    padding: 16,
    backgroundColor: tokens.color.primary,
    borderRadius: tokens.radius,
    overflow: 'hidden',
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryActionText: {
    color: tokens.color.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  primaryActionHint: {
    color: tokens.color.onPrimary,
    fontSize: 13,
  },
  secondaryAction: {
    justifyContent: 'center',
    flexBasis: 240,
    flexGrow: 1,
    minWidth: 0,
    gap: 4,
    minHeight: 86,
    padding: 16,
    backgroundColor: tokens.color.surface,
    borderColor: tokens.color.primaryBorder,
    borderRadius: tokens.radius,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  secondaryActionText: {
    color: tokens.color.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryActionHint: {
    color: tokens.color.muted,
    fontSize: 13,
  },

  // Activity List
  activityList: {
    backgroundColor: tokens.color.surface,
    borderColor: tokens.color.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activityBorder: {
    borderTopColor: tokens.color.divider,
    borderTopWidth: 1,
  },
  activityMarker: {
    width: 8,
    height: 8,
    backgroundColor: tokens.color.teal,
    borderRadius: 4,
  },
  activityText: {
    flex: 1,
    gap: 3,
  },
  activityTitle: {
    color: tokens.color.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  activityDetail: {
    color: tokens.color.muted,
    fontSize: 13,
  },
  activityTime: {
    color: tokens.color.muted,
    fontSize: 12,
    textAlign: 'right',
  },

  // Course List
  courseList: {
    gap: tokens.space.small,
  },
  coursePressable: {
    borderRadius: 8,
  },
  course: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 92,
    paddingRight: 14,
    backgroundColor: tokens.color.surface,
    borderColor: tokens.color.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  coursePressed: {
    backgroundColor: tokens.color.coursePressedSurface,
    borderColor: tokens.color.coursePressedBorder,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  courseText: {
    flex: 1,
    minWidth: 0,
    gap: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  courseCode: {
    color: tokens.color.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  courseTitle: {
    color: tokens.color.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  courseMeta: {
    color: tokens.color.muted,
    fontSize: 13,
  },
  viewButton: {
    color: tokens.color.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.72,
  },
  actionPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  }
});
