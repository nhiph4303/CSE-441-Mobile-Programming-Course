import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddCustomer({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to add customer and navigate back after success
  async function addCustomer() {
    // Reset error message
    setErrorMessage('');

    // Validate input fields
    if (!name.trim()) {
      setErrorMessage('Please enter a customer name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter a phone number.');
      return;
    }

    // Ensure phone is a valid number
    const parsedPhone = parseFloat(phone);
    if (isNaN(parsedPhone)) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    // Check if token is available
    if (!token) {
      setErrorMessage('Authorization failed. Please log in again.');
      return;
    }

    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/customers',
        { name: name.trim(), phone: parsedPhone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('API Response:', response.data);
      // Show success message and navigate back
      Alert.alert('Success', 'Customer added successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Customer') }, // Quay về màn hình chính
      ]);
    } catch (e) {
      console.log('Error Details:', e.response ? e.response.data : e.message);
      if (e.response) {
        switch (e.response.status) {
          case 401:
            setErrorMessage('Unauthorized. Please log in again.');
            await AsyncStorage.removeItem('token'); // Xóa token cũ
            break;
          case 400:
            setErrorMessage('Invalid data. ' + (e.response.data.message || ''));
            break;
          default:
            setErrorMessage('Failed to add customer. Please try again.');
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
        console.log('Token retrieved in AddCustomer:', val);
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
            onPress={() => navigation.navigate('Main')} // Quay về màn hình chính
          />
          <Text style={styles.headerTitle}>Add Customer</Text>
        </View>
        <View>
          <Text style={styles.title}>Customer name *</Text>
          <TextInput
            onChangeText={(value) => setName(value)}
            value={name}
            style={{ marginBottom: 15, marginHorizontal: 10 }}
            theme={{ roundness: 10 }}
            mode="outlined"
            label="Input your customer's name"
          />
          <Text style={styles.title}>Phone *</Text>
          <TextInput
            onChangeText={(value) => {
              const phoneNum = parseFloat(value);
              if (isNaN(phoneNum) || value === '') {
                setPhone(value); // Cho phép trống để xóa
              } else {
                setPhone(value);
              }
            }}
            value={phone}
            style={{ marginBottom: 15, marginHorizontal: 10 }}
            theme={{ roundness: 10 }}
            mode="outlined"
            label="Input phone number"
            keyboardType="phone-pad"
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.label}
            onPress={() => addCustomer()}>
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
    fontSize: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
});
