import { useAuth } from '@/providers/auth-provider';
import { API_BASE_URL } from '@/utils/api';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const email = 'j.lagumbay.141683.tc@umindanao.edu.ph';
const password = 'lagumbay';

type Quote = { content: string; author: string };

const fallbackQuotes: Quote[] = [
  { content: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { content: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
];

async function requestQuote() {
  const response = await fetch(`${API_BASE_URL}/api/quotes/random`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('The quote service is unavailable.');

  const result = (await response.json()) as Partial<Quote>;
  if (!result.content || !result.author) throw new Error('Invalid quote response.');
  return { content: result.content, author: result.author };
}

export default function HomeScreen() {
  const auth = useAuth();
  const [studentEmail, setStudentEmail] = useState(email);
  const [studentPassword, setStudentPassword] = useState(password);
  const [visible, setVisible] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const loadQuote = useCallback(async () => {
    setQuoteLoading(true);
    try {
      setQuote(await requestQuote());
    } catch {
      setQuote(fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]);
    } finally {
      setQuoteLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth.status !== 'signedIn') return;
    const quoteTimer = setTimeout(() => void loadQuote(), 0);
    return () => clearTimeout(quoteTimer);
  }, [auth.status, loadQuote]);

  if (auth.status === 'loading') {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#078b9b" />
      </SafeAreaView>
    );
  }

  if (auth.status !== 'signedIn' || !auth.student) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          style={styles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.loginPage}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.overline}>WELCOME TO CAMPUS</Text>
            <Text style={styles.loginHeading}>Student Portal</Text>
            <Text style={styles.subtitle}>
              Sign in to access your student profile.
            </Text>

            <View style={styles.loginCard}>
              <Text style={styles.formTitle}>Sign in</Text>

              <Text style={styles.label}>STUDENT EMAIL</Text>
              <TextInput
                accessibilityLabel="Student email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={studentEmail}
                onChangeText={setStudentEmail}
                style={styles.input}
              />

              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  accessibilityLabel="Password"
                  secureTextEntry={!visible}
                  value={studentPassword}
                  onChangeText={setStudentPassword}
                  onSubmitEditing={() =>
                    void auth.signIn(studentEmail, studentPassword)
                  }
                  style={styles.passwordInput}
                />
                <Pressable onPress={() => setVisible(!visible)}>
                  <Text style={styles.show}>{visible ? 'HIDE' : 'SHOW'}</Text>
                </Pressable>
              </View>

              {auth.error && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {auth.error}
                </Text>
              )}

              <Pressable
                accessibilityRole="button"
                disabled={auth.isBusy}
                onPress={() => void auth.signIn(studentEmail, studentPassword)}
                style={styles.button}
              >
                {auth.isBusy ? (
                  <ActivityIndicator color="#07162f" />
                ) : (
                  <Text style={styles.buttonText}>Sign in →</Text>
                )}
              </Pressable>

              <View style={styles.demo}>
                <Text style={styles.demoTitle}>STUDENT ACCOUNT</Text>
                <Text style={styles.demoText}>{email}</Text>
                <Text style={styles.demoText}>{password}</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const student = auth.student;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#07162f" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>CAMPUS · STUDENT PORTAL</Text>
          <Text style={styles.active}>ACTIVE</Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.overline}>YOUR PERSONAL SPACE</Text>
          <Text style={styles.heading}>Welcome back,</Text>
          <Text style={styles.name}>{student.name.split(' ')[0]}.</Text>
          <Text style={styles.subtitle}>
            Here’s your student profile at a glance.
          </Text>
        </View>

        <View style={styles.profile}>
          <Text style={styles.profileName}>{student.name}</Text>
          <Text style={styles.profileEmail}>{student.email}</Text>
          <Detail label="STUDENT NUMBER" value={student.studentNumber} />
          <Detail label="PROGRAM" value={student.program} />
          <Detail label="YEAR LEVEL" value={student.yearLevel} />
        </View>

        <View style={styles.quoteSection}>
          <Text style={styles.quoteOverline}>A LITTLE INSPIRATION</Text>
          <Text style={styles.quoteTitle}>Quote of the day</Text>
          <View style={styles.quoteCard}>
            {quoteLoading && !quote ? (
              <ActivityIndicator size="large" color="#54d9ce" />
            ) : (
              <>
                <Text style={styles.quoteMark}>{'\u201c'}</Text>
                <Text style={styles.quoteText}>{quote?.content}</Text>
                <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
              </>
            )}
          </View>
          <Pressable
            accessibilityRole="button"
            disabled={quoteLoading}
            onPress={() => void loadQuote()}
            style={styles.newQuote}
          >
            <Text style={styles.newQuoteText}>
              {quoteLoading ? 'Finding a quote...' : 'New quote →'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => void auth.signOut()}
          style={styles.signOut}
        >
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  fill: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginPage: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loginHeading: {
    color: '#102347',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#728098',
    fontSize: 13,
    marginTop: 8,
  },
  overline: {
    color: '#078b9b',
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '900',
  },
  loginCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 23,
    marginTop: 28,
  },
  formTitle: {
    color: '#102347',
    fontSize: 21,
    fontWeight: '900',
  },
  label: {
    color: '#48566f',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.3,
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    minHeight: 51,
    borderWidth: 1,
    borderColor: '#dfe6ef',
    borderRadius: 13,
    paddingHorizontal: 14,
    color: '#102347',
  },
  passwordRow: {
    minHeight: 51,
    borderWidth: 1,
    borderColor: '#dfe6ef',
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: '#102347',
  },
  show: {
    color: '#078b9b',
    fontSize: 9,
    fontWeight: '900',
  },
  error: {
    color: '#b54738',
    backgroundColor: '#fff1ed',
    padding: 11,
    borderRadius: 12,
    marginTop: 13,
  },
  button: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: '#54d9ce',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#07162f',
    fontSize: 14,
    fontWeight: '900',
  },
  demo: {
    backgroundColor: '#f0f7f8',
    borderRadius: 13,
    padding: 12,
    marginTop: 20,
  },
  demoTitle: {
    color: '#078b9b',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  demoText: {
    color: '#53647c',
    fontSize: 11,
    lineHeight: 17,
  },
  page: {
    flexGrow: 1,
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
    padding: 23,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#102347',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.3,
  },
  active: {
    color: '#167d69',
    fontSize: 9,
    fontWeight: '900',
  },
  welcome: {
    marginTop: 28,
    marginBottom: 20,
  },
  heading: {
    color: '#102347',
    fontSize: 29,
    fontWeight: '700',
  },
  name: {
    color: '#102347',
    fontSize: 36,
    fontWeight: '900',
  },
  profile: {
    backgroundColor: '#595910',
    borderRadius: 22,
    padding: 21,
  },
  profileName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
  profileEmail: {
    color: '#b1c3dc',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 20,
  },
  detail: {
    marginTop: 14,
  },
  detailLabel: {
    color: '#93a8c7',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
  },
  signOut: {
    alignSelf: 'center',
    padding: 16,
  },
  signOutText: {
    color: '#64748b',
    fontWeight: '700',
  },
  quoteSection: {
    marginTop: 32,
  },
  quoteOverline: {
    color: '#078b9b',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  quoteTitle: {
    color: '#102347',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 14,
  },
  quoteCard: {
    alignItems: 'flex-start',
    backgroundColor: '#7e6a2b',
    borderRadius: 22,
    justifyContent: 'center',
    minHeight: 205,
    padding: 22,
  },
  quoteMark: {
    color: '#54d9ce',
    fontSize: 52,
    fontWeight: '900',
    height: 45,
    lineHeight: 50,
  },
  quoteText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 28,
  },
  quoteAuthor: {
    color: '#c5d2e5',
    fontSize: 13,
    marginTop: 16,
  },
  newQuote: {
    alignItems: 'center',
    padding: 15,
  },
  newQuoteText: {
    color: '#078b9b',
    fontSize: 13,
    fontWeight: '900',
  },
});
