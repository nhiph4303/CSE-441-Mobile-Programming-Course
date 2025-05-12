import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const HailstoneSequence = () => {
  const [number, setNumber] = useState('');
  const [sequence, setSequence] = useState([]);

  const calculateHailstone = () => {
    const n = parseInt(number);
    if (isNaN(n) || n <= 0) {
      setSequence(['Please enter a positive number.']);
      return;
    }

    let current = n;
    const seq = [current];
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = current * 3 + 1;
      }
      seq.push(current);
    }
    setSequence(seq);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hailstone Sequence</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a positive number"
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <Button title="Generate Sequence" onPress={calculateHailstone} />
      <ScrollView style={styles.resultContainer}>
        {sequence.length > 0 && (
          <Text style={styles.result}>
            Sequence: {sequence.join(' -> ')}
          </Text>
        )}
      </ScrollView>
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
  resultContainer: {
    maxHeight: 100,
    marginTop: 10,
  },
  result: {
    fontSize: 16,
  },
});

export default HailstoneSequence;