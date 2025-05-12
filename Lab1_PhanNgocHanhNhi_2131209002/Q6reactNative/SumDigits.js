import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SumDigits = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const calculateSum = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid positive number.');
      return;
    }

    const numStr = num.toString();
    const firstDigit = parseInt(numStr[0]);
    const lastDigit = parseInt(numStr[numStr.length - 1]);
    const sum = firstDigit + lastDigit;
    setResult(`Sum the first digits ${firstDigit} and the last digits ${lastDigit}: ${sum}`);
  23};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sum the first digit and the last digit of a number</Text>
      <Text style={styles.label}>Enter a number</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculateSum} />
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
});

export default SumDigits;