import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

interface SettingSwitchProps {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}

function SettingSwitch({ label, value, onChange }: SettingSwitchProps) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#BCCCDC', true: '#65C9C8' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [dueReminders, setDueReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View>
        <Text style={styles.eyebrow}>PERMISSIONS</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Pick the reminders that help you stay on track.
        </Text>
      </View>

      <View style={styles.group}>
        <SettingSwitch
          label="Assignment reminders"
          value={dueReminders}
          onChange={setDueReminders}
        />
        <SettingSwitch
          label="Weekly course digest"
          value={weeklyDigest}
          onChange={setWeeklyDigest}
        />
      </View>

      <Pressable
        onPress={() => router.push('/preferences' as Href)}
        style={({ pressed }) => [styles.rowButton, pressed && styles.pressed]}
      >
        <View>
          <Text style={styles.rowTitle}>Notification preferences</Text>
          <Text style={styles.rowNote}>Schedule and delivery settings</Text>
        </View>
        <Text style={styles.rowAction}>Open</Text>
      </Pressable>

      <View style={styles.accountGroup}>
        <Text style={styles.groupLabel}>Account</Text>

        <Pressable
          style={({ pressed }) => [styles.accountRow, pressed && styles.pressed]}
        >
          <Text style={styles.accountText}>Update contact information</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.accountRow, pressed && styles.pressed]}
        >
          <Text style={[styles.accountText, styles.signOut]}>Sign out</Text>
        </Pressable>
      </View>
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
  title: {
    marginBottom: 5,
    color: '#25324A',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: '#6D7280',
    fontSize: 15,
    lineHeight: 22,
  },
  group: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
    paddingHorizontal: 16,
    borderBottomColor: '#EEE8DD',
    borderBottomWidth: 1,
  },
  switchLabel: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 76,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
  },
  rowTitle: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '700',
  },
  rowNote: {
    marginTop: 3,
    color: '#6D7280',
    fontSize: 13,
  },
  rowAction: {
    color: '#275DAD',
    fontSize: 14,
    fontWeight: '800',
  },
  accountGroup: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  groupLabel: {
    padding: 16,
    color: '#6D7280',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  accountRow: {
    justifyContent: 'center',
    minHeight: 54,
    paddingHorizontal: 16,
    borderTopColor: '#EEE8DD',
    borderTopWidth: 1,
  },
  accountText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
  signOut: {
    color: '#B42318',
  },
  eyebrow: { color: '#275DAD', fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  pressed: {
    opacity: 0.72,
  },
});
