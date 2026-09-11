import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function PreferencesScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <Text style={styles.description}>
      Keep the notifications that are genuinely useful for school.
    </Text>

    <View style={styles.card}>
      <Preference
        label="Push notifications"
        value={pushEnabled}
        onChange={setPushEnabled}
      />
      <Preference
        label="Email notifications"
        value={emailEnabled}
        onChange={setEmailEnabled}
      />
    </View>

    <Pressable style={styles.button} onPress={() => router.back()}>
      <Text style={styles.buttonText}>Done</Text>
    </Pressable>
  </ScrollView>
);
}

interface PreferenceProps {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}

function Preference({ label, value, onChange }: PreferenceProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#BCCCDC', true: '#65C9C8' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFDF7',
  },
  content: {
    gap: 20,
    padding: 20,
    paddingBottom: 32,
  },
  description: {
    color: '#6D7280',
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5DED2',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
    paddingHorizontal: 16,
    borderBottomColor: '#EEE8DD',
    borderBottomWidth: 1,
  },
  rowLabel: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: '#275DAD',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
