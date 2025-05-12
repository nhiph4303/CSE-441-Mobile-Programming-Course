import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Employee from './Employee';
import SumDigits from './SumDigits';
import MinThreeNumbers from './MinThreeNumbers';
import HailstoneSequence from './HailstoneSequence';

const App = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');

  return (
    <ScrollView style={styles.container}>
      <Employee onUpdateSuccess={setSuccessMessage} />
      {successMessage && <Text style={styles.message}>{successMessage}</Text>}
      <SumDigits />
      <MinThreeNumbers />
      <HailstoneSequence />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;