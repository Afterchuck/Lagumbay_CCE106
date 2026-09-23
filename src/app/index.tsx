import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Quote = { content: string; author: string };

const fallbackQuotes: Quote[] = [
  { content: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { content: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { content: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { content: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
];

export default function HomeScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.quotable.io/random', {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('The quote service is unavailable right now.');
      const result = (await response.json()) as { content?: string; author?: string };
      if (!result.content || !result.author) throw new Error('The quote service returned an invalid response.');
      setQuote({ content: result.content, author: result.author });
    } catch {
      setError('Could not reach the quote service. Here’s a quote to keep you inspired.');
      setQuote(fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote]);

  return (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" backgroundColor="#07162f" />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topLine} />
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoMark}>“</Text>
        </View>
        <Text style={styles.eyebrow}>A LITTLE INSPIRATION</Text>
        <Text style={styles.title}>Quote of the day</Text>
        <Text style={styles.subtitle}>A fresh thought to carry with you.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.pill}>
            <View style={styles.dot} />
            <Text style={styles.pillText}>DAILY THOUGHT</Text>
          </View>
          <Text style={styles.sparkle}>✦</Text>
        </View>
        {loading && !quote ? (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color="#57d8cb" />
            <Text style={styles.loadingText}>Finding a little inspiration…</Text>
          </View>
        ) : (
          <>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.quote}>{quote?.content}</Text>
            <View style={styles.authorRow}>
              <View style={styles.authorRule} />
              <Text style={styles.author}>{quote?.author}</Text>
            </View>
          </>
        )}
        {error && (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        )}
        <View style={styles.cardFooter}>
          <Text style={styles.footerLabel}>
            WORDS TO LIVE BY
          </Text>
          <Text style={styles.footerSymbol}>
            ✧
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Get a new quote"
        onPress={() => void fetchQuote()}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}>
        {loading ? (
          <ActivityIndicator color="#07162f" />
        ) : (
          <Text style={styles.buttonIcon}>↻</Text>
        )}
        <Text style={styles.buttonText}>
          {loading ? 'Finding a quote…' : 'New quote'}
        </Text>
        {!loading && <Text style={styles.buttonArrow}>→</Text>}
      </Pressable>

      <View style={styles.note}>
        <Text style={styles.noteIcon}>✦</Text>
        <Text style={styles.noteText}>
          Take what you need. Pass the good words on.
        </Text>
      </View>
      <Text style={styles.signature}>MADE FOR A MOMENT OF PAUSE</Text>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  topLine: {
    height: 4,
    width: 54,
    borderRadius: 2,
    backgroundColor: '#29c5c4',
    marginTop: 14,
    marginBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 27,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#e4f5f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 19,
  },
  logoMark: {
    color: '#078b9b',
    fontSize: 47,
    lineHeight: 57,
    fontWeight: '700',
    marginTop: 4,
  },
  eyebrow: {
    color: '#078b9b',
    fontSize: 10,
    letterSpacing: 2.4,
    fontWeight: '800',
    marginBottom: 8,
  },
  title: {
    color: '#102347',
    fontSize: 31,
    fontWeight: '800',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#728098',
    fontSize: 14,
    marginTop: 8,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 24,
    backgroundColor: '#7e6a2b',
    paddingHorizontal: 25,
    paddingTop: 22,
    paddingBottom: 17,
    minHeight: 280,
    shadowColor: '#102b59',
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 211, 203, 0.14)',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#53ded0',
    marginRight: 7,
  },
  pillText: {
    color: '#69e0d7',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  sparkle: {
    color: '#f1cb6a',
    fontSize: 21,
  },
  quoteMark: {
    color: '#56d7cf',
    fontSize: 60,
    lineHeight: 57,
    height: 50,
    fontWeight: '800',
    marginLeft: -3,
  },
  quote: {
    color: '#fff',
    fontSize: 23,
    lineHeight: 33,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 21,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorRule: {
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#56d7cf',
    marginRight: 10,
  },
  author: {
    color: '#b7c7e1',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingState: {
    flex: 1,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#d4dfed',
    fontSize: 14,
    marginTop: 15,
  },
  error: {
    color: '#ffd994',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 15,
  },
  cardFooter: {
    marginTop: 21,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.13)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    color: '#92a7c8',
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  footerSymbol: {
    color: '#56d7cf',
    fontSize: 17,
  },
  button: {
    maxWidth: 440,
    width: '100%',
    height: 58,
    marginTop: 21,
    borderRadius: 17,
    backgroundColor: '#54d9ce',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#12aaa7',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonIcon: {
    color: '#092344',
    fontSize: 24,
    marginRight: 9,
    fontWeight: '700',
  },
  buttonText: {
    color: '#092344',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonArrow: {
    color: '#092344',
    fontSize: 20,
    marginLeft: 9,
    fontWeight: '700',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
    paddingHorizontal: 5,
  },
  noteIcon: {
    color: '#e2b94c',
    fontSize: 15,
    marginRight: 8,
  },
  noteText: {
    color: '#6d7c91',
    fontSize: 12,
    textAlign: 'center',
  },
  signature: {
    color: '#a0adbd',
    fontSize: 8,
    letterSpacing: 1.8,
    fontWeight: '700',
    marginTop: 24,
  },
});