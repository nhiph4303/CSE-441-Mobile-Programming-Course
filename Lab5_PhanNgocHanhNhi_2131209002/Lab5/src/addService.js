import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddService({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to add service and navigate back to home after success
  async function addService() {
    // Reset error message
    setErrorMessage('');

    // Validate input fields
    if (!name || !price) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    // Ensure price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      setErrorMessage('Please enter a valid price.');
      return;
    }

    // Check if token is available
    if (!token) {
      setErrorMessage('Authorization failed. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          name,
          price: parsedPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);
      // Navigate back to Home screen after successful add
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error', e);
      setErrorMessage('Failed to add service. Please try again.');
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('token').then((val) => {
      setToken(val);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={25}
          color="white"
          onPress={() => navigation.navigate('Home')} // Go back to the Home screen
        />
        <Text style={styles.headerTitle}>Service</Text>
      </View>

      <View>
        <Text style={styles.title}>Service name *</Text>
        <TextInput
          onChangeText={(value) => {
            setName(value);
          }}
          value={name}
          style={{ marginBottom: 15, marginHorizontal: 10 }}
          theme={{ roundness: 10 }}
          mode="outlined"
          label="Input a service name"
        />
        <Text style={styles.title}>Price *</Text>
        <TextInput
          onChangeText={(value) => {
            // Regular expression to allow only numbers and a single decimal point
            if (/^\d+(\.\d{0,2})?$/.test(value)) {
              setPrice(value); // Valid price, update state
            }
          }}
          value={price}
          style={{ marginBottom: 10, marginHorizontal: 10 }}
          theme={{ roundness: 10 }}
          mode="outlined"
          label="Price"
          keyboardType="numeric"
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => addService()}>
          Add
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ef536d',
    padding: 10,
  },
  headerTitle: {
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#ef536d',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 5,
    marginHorizontal: 10,
    fontSize: 20,
  },
  label: {
    fontSize: 18,
  },
  title: {
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
});
