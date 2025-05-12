import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MinThreeNumbers = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [result, setResult] = useState(null);

  const findMinimum = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const n3 = parseFloat(num3);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      setResult('Please enter valid numbers.');
      return;
    }

    const min = Math.min(n1, n2, n3);
    setResult(`Minimum between three numbers ${n1}, ${n2}, ${n3} is: ${min}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find the minimum between three numbers</Text>
      <Text style={styles.label}>Enter number 1</Text>
      <TextInput
        style={styles.input}
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Enter number 2</Text>
      <TextInput
        style={styles.input}
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Enter number 3</Text>
      <TextInput
        style={styles.input}
        value={num3}
        onChangeText={setNum3}
        keyboardType="numeric"
      />
      <Button title="Find Minimum" onPress={findMinimum} />
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

export default MinThreeNumbers;