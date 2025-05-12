import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Employee = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [specializedOccupation, setSpecializedOccupation] = useState('');

  const handleUpdate = () => {
    if (!fullName || !age || !specializedOccupation) {
      Alert.alert('Error', 'All fields are required.', [{ text: 'OK' }]);
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert('Error', 'Please enter a valid age.', [{ text: 'OK' }]);
      return;
    }

    Alert.alert('Success', 'Employee information updated successfully!', [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee information entry</Text>
      <Text style={styles.label}>Full name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Occupation specialized in training</Text>
      <TextInput
        style={styles.input}
        value={specializedOccupation}
        onChangeText={setSpecializedOccupation}
      />

      <Button title="Update" onPress={handleUpdate} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'red',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default Employee;