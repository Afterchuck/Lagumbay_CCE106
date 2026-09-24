import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentUser, loginUser } from '@/services/authServices';
import { deleteToken, getToken, saveToken } from '@/storage/tokenStorage';

type Profile = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
};

export default function HomeScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [startupLoading, setStartupLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const token = await getToken();
        if (token) {
          const currentUser = await getCurrentUser(token);
          if (active) setProfile(currentUser);
        }
      } catch (restoreError) {
        try {
          await deleteToken();
        } catch {
          // Keep the login form available even if secure storage cannot be cleared.
        }
        if (active) {
          setError(restoreError instanceof Error ? restoreError.message : 'Could not restore your session. Please log in again.');
        }
      } finally {
        if (active) setStartupLoading(false);
      }
    }

    void restoreSession();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin() {
    if (loading) return;
    setError('');
    setLoading(true);
    try {
      const result = await loginUser(username.trim(), password);
      const token = result.accessToken ?? result.token;
      if (!token) throw new Error('Login succeeded but no access token was returned.');
      await saveToken(token);
      const currentUser = await getCurrentUser(token);
      setProfile(currentUser);
    } catch (loginError) {
      await deleteToken();
      setError(loginError instanceof Error ? loginError.message : 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await deleteToken();
    } finally {
      setProfile(null);
      setPassword('');
      setError('');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.brandMark}><Text style={styles.brandMarkText}>S</Text></View>
            <Text style={styles.eyebrow}>PRIVATE BY DESIGN</Text>
            <Text style={styles.title}>{profile ? 'You’re signed in' : 'Secure Profile'}</Text>
            <Text style={styles.subtitle}>
              {profile ? 'Your profile is protected and ready.' : 'Sign in to access your personal profile.'}
            </Text>

            {startupLoading ? (
              <View style={styles.startupLoading} accessibilityRole="progressbar">
                <ActivityIndicator size="large" color="#2764ce" />
                <Text style={styles.helperText}>Checking for a saved session…</Text>
              </View>
            ) : profile ? (
              <View style={styles.profileCard}>
                <Text style={styles.profileName}>
                  {[profile.firstName, profile.lastName].filter(Boolean).join(' ') || profile.username || 'Welcome'}
                </Text>
                {!!profile.image && <Image source={{ uri: profile.image }} style={styles.profileImage} accessibilityLabel="Profile photo" />}
                <Text style={styles.profileDetail}>Username: {profile.username || '—'}</Text>
                {!!profile.email && <Text style={styles.profileEmail}>{profile.email}</Text>}
                <Text style={styles.profileDetail}>User ID: {profile.id ?? '—'}</Text>
                <Pressable onPress={handleLogout} style={styles.secondaryButton} accessibilityRole="button">
                  <Text style={styles.secondaryButtonText}>Log out</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="#8792a2"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="username"
                  autoComplete="username"
                  returnKeyType="next"
                  style={styles.input}
                  accessibilityLabel="Username"
                />
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordInputWrap}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#8792a2"
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    autoComplete="current-password"
                    returnKeyType="go"
                    onSubmitEditing={handleLogin}
                    style={[styles.input, styles.passwordInput]}
                    accessibilityLabel="Password"
                  />
                  <Pressable
                    onPress={() => setShowPassword((visible) => !visible)}
                    style={styles.passwordToggle}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    accessibilityState={{ selected: showPassword }}
                  >
                    <Text style={styles.passwordToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                  </Pressable>
                </View>

                {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

                <Pressable
                  onPress={handleLogin}
                  disabled={loading || !username.trim() || !password}
                  style={({ pressed }) => [styles.loginButton, pressed && styles.pressed, (loading || !username.trim() || !password) && styles.disabled]}
                  accessibilityRole="button"
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Log in</Text>}
                </Pressable>
                <Text style={styles.helperText}>Your credentials are sent securely and never displayed.</Text>
              </View>
            )}
          </View>
          <Text style={styles.footer}>SECURE PROFILE  ·  PERSONAL ACCESS</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#f4f7fb' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 36 },
  card: {
    width: '100%', maxWidth: 440, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 24,
    paddingHorizontal: 28, paddingTop: 32, paddingBottom: 30,
    shadowColor: '#173153', shadowOpacity: 0.08, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 4,
  },
  brandMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#e9f1ff', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  brandMarkText: { color: '#2764ce', fontSize: 24, fontWeight: '800' },
  eyebrow: { color: '#5275ae', fontSize: 11, fontWeight: '700', letterSpacing: 1.6, marginBottom: 9 },
  title: { color: '#14243a', fontSize: 30, lineHeight: 36, fontWeight: '700', letterSpacing: -0.7 },
  subtitle: { color: '#66758a', fontSize: 15, lineHeight: 23, marginTop: 8, marginBottom: 28 },
  form: { gap: 10 },
  startupLoading: { minHeight: 120, alignItems: 'center', justifyContent: 'center', gap: 12 },
  label: { color: '#26364c', fontSize: 13, fontWeight: '600', marginTop: 4 },
  input: { height: 52, borderColor: '#dce4ee', borderWidth: 1, borderRadius: 12, paddingHorizontal: 15, color: '#17263b', fontSize: 15, backgroundColor: '#fff' },
  passwordInputWrap: { justifyContent: 'center' },
  passwordInput: { paddingRight: 76 },
  passwordToggle: { position: 'absolute', right: 4, height: 44, minWidth: 60, alignItems: 'center', justifyContent: 'center' },
  passwordToggleText: { color: '#2764ce', fontSize: 13, fontWeight: '700' },
  loginButton: { marginTop: 12, height: 54, borderRadius: 12, backgroundColor: '#2764ce', alignItems: 'center', justifyContent: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.56 },
  error: { color: '#b42318', backgroundColor: '#fff1f0', borderRadius: 10, overflow: 'hidden', padding: 12, fontSize: 14, lineHeight: 20 },
  helperText: { color: '#8792a2', textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 8 },
  profileCard: { padding: 18, borderRadius: 14, backgroundColor: '#f5f8fd' },
  profileName: { color: '#14243a', fontSize: 18, fontWeight: '700' },
  profileImage: { width: 88, height: 88, borderRadius: 44, marginTop: 16, marginBottom: 12, backgroundColor: '#e9f1ff', alignSelf: 'flex-start' },
  profileDetail: { color: '#44546a', fontSize: 14, marginTop: 8 },
  profileEmail: { color: '#66758a', fontSize: 14, marginTop: 4 },
  secondaryButton: { marginTop: 20, borderColor: '#d5dfed', borderWidth: 1, paddingVertical: 13, alignItems: 'center', borderRadius: 10 },
  secondaryButtonText: { color: '#294466', fontSize: 15, fontWeight: '600' },
  footer: { alignSelf: 'center', marginTop: 24, color: '#9aa5b4', fontSize: 10, fontWeight: '600', letterSpacing: 1.4 },
});
