import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAuth } from '@/providers/auth-provider';

const colors = {
  navy: '#102b59',
  deep: '#07162f',
  teal: '#54d9ce',
  ink: '#102347',
  muted: '#728098',
  page: '#f4f7fb',
  white: '#ffffff',
};

function LoadingScreen({ message }: { message: string }) {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator size="large" color={colors.teal} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { status, student, error, isBusy, sessionExpiresAt, signIn, signOut, retryRestore, refreshProfile } = useAuth();
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('Student123!');
  const [showPassword, setShowPassword] = useState(false);

  if (status === 'restoring') {
    return <SafeAreaView style={styles.safeArea}><StatusBar barStyle="dark-content" /><LoadingScreen message="Restoring your secure session…" /></SafeAreaView>;
  }

  if (status === 'unavailable') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerState}>
          <View style={styles.brandIcon}><Text style={styles.brandMark}>S</Text></View>
          <Text style={styles.title}>Student Portal</Text>
          <Text style={styles.bodyCenter}>{error || 'The student service is currently unavailable.'}</Text>
          <Pressable style={styles.primaryButton} onPress={() => void retryRestore()}>
            <Text style={styles.primaryButtonText}>Try again</Text>
          </Pressable>
          <Pressable style={styles.textButton} onPress={() => void signOut()}>
            <Text style={styles.textButtonLabel}>Sign in with another session</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'signedIn' && student) {
    const initials = student.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.deep} />
        <ScrollView contentContainerStyle={styles.page}>
          <View style={styles.topBar}>
            <View style={styles.brandRow}>
              <View style={styles.brandIconSmall}><Text style={styles.brandMarkSmall}>S</Text></View>
              <View><Text style={styles.brandName}>CAMPUS</Text><Text style={styles.brandCaption}>STUDENT PORTAL</Text></View>
            </View>
            <View style={styles.secureBadge}><View style={styles.onlineDot} /><Text style={styles.secureBadgeText}>SECURE</Text></View>
          </View>

          <View style={styles.welcomeBlock}>
            <Text style={styles.overline}>YOUR PERSONAL SPACE</Text>
            <Text style={styles.heading}>Welcome back,</Text>
            <Text style={styles.nameHeading}>{student.name.split(' ')[0]}.</Text>
            <Text style={styles.subtitle}>Here’s your student profile at a glance.</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
              <View style={styles.profileNameBlock}>
                <Text style={styles.profileName}>{student.name}</Text>
                <Text style={styles.profileEmail}>{student.email}</Text>
              </View>
              <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>ACTIVE</Text></View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}><Text style={styles.infoIconText}>ID</Text></View>
              <View style={styles.infoText}><Text style={styles.infoLabel}>STUDENT NUMBER</Text><Text style={styles.infoValue}>{student.studentNumber}</Text></View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}><Text style={styles.infoIconText}>⌂</Text></View>
              <View style={styles.infoText}><Text style={styles.infoLabel}>PROGRAM</Text><Text style={styles.infoValue}>{student.program}</Text></View>
            </View>
            <View style={[styles.infoRow, styles.lastInfoRow]}>
              <View style={styles.infoIcon}><Text style={styles.infoIconText}>↗</Text></View>
              <View style={styles.infoText}><Text style={styles.infoLabel}>YEAR LEVEL</Text><Text style={styles.infoValue}>{student.yearLevel}</Text></View>
            </View>
          </View>

          <View style={styles.sessionCard}>
            <View style={styles.sessionIcon}><Text style={styles.sessionIconText}>✓</Text></View>
            <View style={styles.sessionCopy}>
              <Text style={styles.sessionTitle}>Session protected</Text>
              <Text style={styles.sessionDescription}>
                Your token is saved securely on this device and checked with the server when the app opens.
              </Text>
              {sessionExpiresAt && <Text style={styles.expiryText}>EXPIRES {new Date(sessionExpiresAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Text>}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Refresh student profile" onPress={() => void refreshProfile()} disabled={isBusy} style={styles.refreshButton}>
              {isBusy ? <ActivityIndicator size="small" color={colors.navy} /> : <Text style={styles.refreshGlyph}>↻</Text>}
            </Pressable>
          </View>

          {error && <Text accessibilityRole="alert" style={styles.inlineError}>{error}</Text>}

          <Pressable accessibilityRole="button" onPress={() => router.push('/quotes')} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Text style={styles.primaryButtonText}>Open your daily quote</Text><Text style={styles.buttonArrow}>→</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => void signOut()} disabled={isBusy} style={styles.logoutButton}>
            <Text style={styles.logoutLabel}>{isBusy ? 'Signing out…' : 'Sign out'}</Text>
          </Pressable>
          <Text style={styles.footer}>YOUR LEARNING JOURNEY, ALL IN ONE PLACE</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.loginPage} keyboardShouldPersistTaps="handled">
          <View style={styles.loginBrand}>
            <View style={styles.brandIcon}><Text style={styles.brandMark}>S</Text></View>
            <Text style={styles.overline}>WELCOME TO CAMPUS</Text>
            <Text style={styles.title}>Student Portal</Text>
            <Text style={styles.subtitleCenter}>Sign in to access your profile and student services.</Text>
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.formTitle}>Sign in</Text>
            <Text style={styles.formHint}>Use your student account to continue.</Text>

            <Text style={styles.inputLabel}>STUDENT EMAIL</Text>
            <TextInput
              accessibilityLabel="Student email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="you@campus.edu"
              placeholderTextColor="#97a3b5"
              style={styles.input}
              value={email}
            />

            <Text style={styles.inputLabel}>PASSWORD</Text>
            <View style={styles.passwordInputWrap}>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                onChangeText={setPassword}
                onSubmitEditing={() => void signIn(email, password)}
                placeholder="Enter your password"
                placeholderTextColor="#97a3b5"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                value={password}
              />
              <Pressable accessibilityRole="button" onPress={() => setShowPassword((visible) => !visible)} hitSlop={10}>
                <Text style={styles.showPassword}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
              </Pressable>
            </View>

            {error && <Text accessibilityRole="alert" style={styles.inlineError}>{error}</Text>}

            <Pressable accessibilityRole="button" disabled={isBusy || !email.trim() || !password} onPress={() => void signIn(email, password)} style={({ pressed }) => [styles.primaryButton, styles.loginButton, (isBusy || !email.trim() || !password) && styles.disabledButton, pressed && styles.pressed]}>
              {isBusy ? <ActivityIndicator color={colors.deep} /> : <Text style={styles.primaryButtonText}>Sign in securely</Text>}
              {!isBusy && <Text style={styles.buttonArrow}>→</Text>}
            </Pressable>

            <View style={styles.demoBox}>
              <View style={styles.demoLock}><Text style={styles.demoLockText}>i</Text></View>
              <View style={styles.demoCopy}>
                <Text style={styles.demoTitle}>DEMO STUDENT ACCOUNT</Text>
                <Text style={styles.demoLine}>student@campus.edu</Text>
                <Text style={styles.demoLine}>Student123!</Text>
              </View>
            </View>
          </View>

          <View style={styles.loginFooterRow}><View style={styles.footerLine} /><Text style={styles.loginFooterText}>IDENTITY · SESSION · STUDENT PROFILE</Text><View style={styles.footerLine} /></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.page },
  flex: { flex: 1 },
  page: { flexGrow: 1, paddingHorizontal: 23, paddingBottom: 28, maxWidth: 540, width: '100%', alignSelf: 'center' },
  loginPage: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 23, paddingVertical: 25 },
  topBar: { height: 62, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#e2e8f0', borderBottomWidth: 1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIconSmall: { width: 37, height: 37, borderRadius: 12, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  brandMarkSmall: { color: colors.teal, fontSize: 19, fontWeight: '900' },
  brandName: { color: colors.ink, fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  brandCaption: { color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.5, marginTop: 2 },
  secureBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#e5f7f4', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1caa80' },
  secureBadgeText: { color: '#167d69', fontSize: 9, letterSpacing: 1, fontWeight: '900' },
  welcomeBlock: { alignSelf: 'stretch', marginTop: 29, marginBottom: 21 },
  overline: { color: '#078b9b', fontSize: 9, letterSpacing: 2, fontWeight: '900', textAlign: 'center', marginBottom: 9 },
  heading: { color: colors.ink, fontSize: 29, fontWeight: '700', letterSpacing: -0.7 },
  nameHeading: { color: colors.ink, fontSize: 36, lineHeight: 40, fontWeight: '900', letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 8 },
  profileCard: { backgroundColor: colors.navy, borderRadius: 22, padding: 21, shadowColor: colors.navy, shadowOffset: { width: 0, height: 11 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 7 },
  profileHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 53, height: 53, borderRadius: 18, backgroundColor: 'rgba(84,217,206,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 13, borderWidth: 1, borderColor: 'rgba(84,217,206,0.45)' },
  avatarText: { color: colors.teal, fontWeight: '900', fontSize: 17, letterSpacing: 1 },
  profileNameBlock: { flex: 1 },
  profileName: { color: colors.white, fontSize: 16, fontWeight: '800' },
  profileEmail: { color: '#b1c3dc', fontSize: 11, marginTop: 4 },
  activeBadge: { backgroundColor: 'rgba(84,217,206,0.15)', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5 },
  activeBadgeText: { color: colors.teal, fontSize: 8, letterSpacing: 1, fontWeight: '900' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.13)', marginVertical: 18 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 17 },
  lastInfoRow: { marginBottom: 1 },
  infoIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  infoIconText: { color: colors.teal, fontSize: 13, fontWeight: '900' },
  infoText: { flex: 1 },
  infoLabel: { color: '#93a8c7', fontSize: 8, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  infoValue: { color: colors.white, fontSize: 13, lineHeight: 18, fontWeight: '600' },
  sessionCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.white, borderRadius: 17, padding: 15, marginTop: 15, borderWidth: 1, borderColor: '#e3eaf2' },
  sessionIcon: { width: 31, height: 31, borderRadius: 11, backgroundColor: '#e6f7f2', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  sessionIconText: { color: '#139876', fontWeight: '900', fontSize: 15 },
  sessionCopy: { flex: 1, paddingTop: 1 },
  sessionTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  sessionDescription: { color: colors.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  expiryText: { color: '#078b9b', fontSize: 8, letterSpacing: 1, fontWeight: '900', marginTop: 8 },
  refreshButton: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  refreshGlyph: { color: colors.navy, fontSize: 23, fontWeight: '700' },
  primaryButton: { minHeight: 54, borderRadius: 16, paddingHorizontal: 18, backgroundColor: colors.teal, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  primaryButtonText: { color: colors.deep, fontSize: 14, fontWeight: '900' },
  buttonArrow: { color: colors.deep, fontSize: 20, fontWeight: '800', marginLeft: 10 },
  pressed: { opacity: 0.83, transform: [{ scale: 0.99 }] },
  logoutButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  logoutLabel: { color: '#64748b', fontSize: 13, fontWeight: '700' },
  inlineError: { color: '#b54738', fontSize: 12, lineHeight: 18, backgroundColor: '#fff1ed', borderRadius: 12, padding: 11, marginTop: 13 },
  footer: { color: '#a0adbd', fontSize: 8, letterSpacing: 1.6, fontWeight: '800', textAlign: 'center', marginTop: 9 },
  centerState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 34 },
  loadingText: { color: colors.muted, fontSize: 13, marginTop: 14 },
  brandIcon: { width: 58, height: 58, borderRadius: 19, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  brandMark: { color: colors.teal, fontSize: 28, fontWeight: '900' },
  title: { color: colors.ink, fontSize: 30, letterSpacing: -0.8, fontWeight: '900', textAlign: 'center' },
  bodyCenter: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 10, maxWidth: 330 },
  textButton: { padding: 14, marginTop: 3 },
  textButtonLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  loginBrand: { alignItems: 'center', marginBottom: 26 },
  subtitleCenter: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10, maxWidth: 305 },
  loginCard: { width: '100%', maxWidth: 440, borderRadius: 24, backgroundColor: colors.white, padding: 23, borderWidth: 1, borderColor: '#e5ebf2', shadowColor: colors.navy, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 22, elevation: 4 },
  formTitle: { color: colors.ink, fontSize: 21, fontWeight: '900', letterSpacing: -0.3 },
  formHint: { color: colors.muted, fontSize: 12, marginTop: 5, marginBottom: 22 },
  inputLabel: { color: '#48566f', fontSize: 9, fontWeight: '900', letterSpacing: 1.3, marginBottom: 8, marginTop: 13 },
  input: { minHeight: 51, borderWidth: 1, borderColor: '#dfe6ef', borderRadius: 13, paddingHorizontal: 14, color: colors.ink, fontSize: 14, backgroundColor: '#fbfcfe' },
  passwordInputWrap: { minHeight: 51, borderWidth: 1, borderColor: '#dfe6ef', borderRadius: 13, paddingLeft: 14, paddingRight: 13, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fbfcfe' },
  passwordInput: { flex: 1, color: colors.ink, fontSize: 14, paddingVertical: 12 },
  showPassword: { color: '#078b9b', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  loginButton: { marginTop: 20 },
  disabledButton: { opacity: 0.58 },
  demoBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#f0f7f8', borderRadius: 13, padding: 12, marginTop: 20, borderWidth: 1, borderColor: '#dceff0' },
  demoLock: { width: 24, height: 24, borderRadius: 8, backgroundColor: '#d9f0ef', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  demoLockText: { color: '#078b9b', fontSize: 12, fontWeight: '900' },
  demoCopy: { flex: 1 },
  demoTitle: { color: '#078b9b', fontSize: 8, fontWeight: '900', letterSpacing: 1.2, marginBottom: 5 },
  demoLine: { color: '#53647c', fontSize: 11, lineHeight: 17 },
  loginFooterRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 },
  footerLine: { width: 18, height: 1, backgroundColor: '#ced8e5' },
  loginFooterText: { color: '#98a6b8', fontSize: 8, letterSpacing: 1.1, fontWeight: '800' },
});
