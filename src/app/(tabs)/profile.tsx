import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useEventMate } from '@/context/event-mate-context';

export default function ProfileScreen() {
  const { studentName, setStudentName } = useEventMate();
  const [name, setName] = useState(studentName);
  const [email, setEmail] = useState('j.lagumbay.141683.tc@umindanao.edu.ph');
  const [savedEmail, setSavedEmail] = useState('j.lagumbay.141683.tc@umindanao.edu.ph');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const hasChanges = name !== studentName || email !== savedEmail;

  function saveProfile() {
    const cleanedName = name.trim();
    const cleanedEmail = email.trim();

    if (!cleanedName) {
      setSaved(false);
      setError('Full name is required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(cleanedEmail)) {
      setSaved(false);
      setError('Enter a valid email address, such as name@example.com.');
      return;
    }

    setStudentName(cleanedName);
    setEmail(cleanedEmail);
    setSavedEmail(cleanedEmail);
    setError('');
    setSaved(true);
  }

  return (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/profile.png')} 
        style={styles.avatar} 
      />

      <Text style={styles.title}>
        My Profile
      </Text>

      <Text style={styles.message}>
        Saved profile: {studentName} · {savedEmail}
      </Text>

      <Text style={styles.label}>
        Full Name
      </Text>
      <TextInput
        accessibilityLabel="Full Name"
        value={name}
        onChangeText={(value) => { 
          setName(value); 
          setSaved(false); 
        }}
        placeholder="Enter your full name"
        style={styles.input}
      />

      <Text style={styles.label}>
        Email
      </Text>
      <TextInput
        accessibilityLabel="Email"
        value={email}
        onChangeText={(value) => { 
          setEmail(value); 
          setSaved(false); 
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="name@example.com"
        style={styles.input}
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      {saved ? (
        <Text style={styles.success}>
          Profile saved successfully.
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        disabled={!hasChanges}
        onPress={saveProfile}
        style={({ pressed }) => [
          styles.saveButton, 
          !hasChanges && styles.disabledButton, 
          pressed && styles.pressed
        ]}
      >
        <Text style={styles.saveText}>
          {hasChanges ? 'Save Profile' : 'Profile Saved'}
        </Text>
      </Pressable>
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#f4f7fb',
    flexGrow: 1,
    padding: 20,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dbeafe',
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    maxWidth: 560,
    padding: 20,
    width: '100%',
  },
  avatar: {
    alignSelf: 'center',
    borderColor: '#1d4ed8',
    borderRadius: 48,
    borderWidth: 3,
    height: 96,
    marginBottom: 6,
    width: 96,
  },
  title: {
    color: '#172554',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  label: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  message: {
    color: '#64748b',
    marginBottom: 8,
    textAlign: 'center',
  },
  error: { 
    color: '#b91c1c', 
    fontWeight: '600' 
  },
  success: { 
    color: '#15803d', 
    fontWeight: '700' 
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    marginTop: 8,
    padding: 14,
  },
  disabledButton: { 
    backgroundColor: '#94a3b8' 
  },
  saveText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  pressed: { 
    opacity: 0.7 
  },
});
