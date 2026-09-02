import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface CounterAppProps {
  step?: number;
}

function CounterApp({ step = 1 }: CounterAppProps) {
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + step);
  };

  const handleDecrease = () => {
    setCount((prevCount) => {
      if (prevCount - step < 0) {
        return 0;
      }
      return prevCount - step;
    });
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <ThemedView style={styles.counterContainer}>
      <ThemedText type="subtitle" style={styles.appTitle}>
        Counter App
      </ThemedText>

      <View style={styles.displayBox}>
        <ThemedText style={styles.displayText}>{count}</ThemedText>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.increaseBtn]} onPress={handleIncrease}>
          <ThemedText style={styles.btnText}>Increase</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.decreaseBtn]} onPress={handleDecrease}>
          <ThemedText style={styles.btnText}>Decrease</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={handleReset}>
          <ThemedText style={styles.btnText}>Reset</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredWrapper}>
        <View style={styles.contentBackground}>
          <CounterApp step={1} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  contentBackground: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#d82424',
    padding: 12,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  counterContainer: {
    gap: 16,
    borderColor: '#37c0d2',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  displayBox: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  displayText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  increaseBtn: {
    backgroundColor: '#81c784',
  },
  decreaseBtn: {
    backgroundColor: '#ffb74d',
  },
  resetBtn: {
    backgroundColor: '#64b5f6',
  },
  btnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});