import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddService({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to add service and navigate back after success
  async function addService() {
    // Reset error message
    setErrorMessage('');

    // Validate input fields
    if (!name.trim()) {
      setErrorMessage('Please enter a service name.');
      return;
    }
    if (!price.trim()) {
      setErrorMessage('Please enter a price.');
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
      console.log('Sending data:', { name: name.trim(), price: parsedPrice });
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        { name: name.trim(), price: parsedPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('API Response:', response.data);
      // Show success message and navigate back
      Alert.alert('Success', 'Service added successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('App') }, // Quay về màn hình chính
      ]);
    } catch (e) {
      console.log('Error Details:', e.response ? e.response.data : e.message);
      if (e.response) {
        switch (e.response.status) {
          case 401:
            setErrorMessage('Unauthorized. Please log in again.');
            await AsyncStorage.removeItem('authToken'); // Xóa token cũ
            break;
          case 400:
            setErrorMessage('Invalid data. ' + (e.response.data.message || ''));
            break;
          case 500:
            setErrorMessage('Server error. Please try again later.');
            break;
          default:
            setErrorMessage('Failed to add service. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then((val) => {
        // Sử dụng authToken thay vì token
        console.log('Token retrieved in AddService:', val);
        setToken(val);
      })
      .catch((err) => {
        console.log('AsyncStorage Error:', err);
        setErrorMessage('Error retrieving token.');
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#ef536d' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={25}
            color="white"
            onPress={() => navigation.navigate('App')} // Quay về màn hình chính
          />
          <Text style={styles.headerTitle}>Service</Text>
        </View>
        <View>
          <Text style={styles.title}>Service name *</Text>
          <TextInput
            onChangeText={(value) => setName(value)}
            value={name}
            style={{ marginBottom: 15, marginHorizontal: 10 }}
            theme={{ roundness: 10 }}
            mode="outlined"
            label="Input a service name"
          />
          <Text style={styles.title}>Price *</Text>
          <TextInput
            onChangeText={(value) => {
              if (/^\d+(\.\d{0,2})?$/.test(value) || value === '') {
                setPrice(value); // Cho phép trống để xóa
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
