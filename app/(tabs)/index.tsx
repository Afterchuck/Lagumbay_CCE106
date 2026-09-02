import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<string | number>('0');

  const calculate = (operator: string) => {

    if (num1.trim() === '' || num2.trim() === '') {
      setResult('Please enter both numbers!');
      return;
    }

    const val1 = parseFloat(num1);
    const val2 = parseFloat(num2);

    if (isNaN(val1) || isNaN(val2)) {
      setResult('Invalid input!');
      return;
    }

    if (operator === '/' && val2 === 0) {
      setResult('Cannot divide by zero!');
      return;
    }

    switch (operator) {
      case '+':
        setResult(val1 + val2);
        break;
      case '-':
        setResult(val1 - val2);
        break;
      case '*':
        setResult(val1 * val2);
        break;
      case '/':
        setResult(val1 / val2);
        break;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerImage={<View />}>

      <View style={styles.contentBackground}>  
        <ThemedView style={styles.calcContainer}>
          <ThemedText type="subtitle" style={styles.calcTitle}>
            Simple Calculator
          </ThemedText>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={num1}
              onChangeText={setNum1}
            />
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={num2}
              onChangeText={setNum2}
            />
          </View>

          {/* ACTION BUTTONS: Each button passes its corresponding math symbol to calculate() */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => calculate('+')}>
              <ThemedText style={styles.btnText}>+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => calculate('-')}>
              <ThemedText style={styles.btnText}>-</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => calculate('*')}>
              <ThemedText style={styles.btnText}>×</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => calculate('/')}>
              <ThemedText style={styles.btnText}>÷</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.resultBox}>
            <ThemedText style={styles.resultText}>Result: {result}</ThemedText>
          </View>
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentBackground: {
    backgroundColor: '#ba1515',
    padding: 12,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calcContainer: {
    gap: 12,
    borderColor: '#37c0d2',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },
  calcTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    padding: 12,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#37c0d2',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#37c0d2',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});