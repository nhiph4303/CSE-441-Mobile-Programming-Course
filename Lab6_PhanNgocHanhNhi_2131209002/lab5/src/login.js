import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Login = ({ navigation }) => {
//   const [phoneInput, setPhoneInput] = useState('');
//   const [passwordInput, setPasswordInput] = useState('');
//   const [hidePassword, setHidePassword] = useState(true);

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(
//       'https://cors-anywhere.herokuapp.com/https://kami-backend-5rs0.onrender.com/auth',
//       {
//         phone: '0373007856',
//         password: '123',
//       },
//       {
//         headers: {
//           Origin: 'https://kami-backend-5rs0.onrender.com/auth', // Hoặc thay thế bằng URL nguồn của bạn
//           'X-Requested-With': 'XMLHttpRequest', // Header này giúp xác nhận yêu cầu AJAX
//           'Content-Type': 'Application/json',
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// const handleLogin = async () => {
//   try {
//     const url = 'https://kami-backend-5rs0.onrender.com/services';
//     const response = await axios.get(
//       `https://cors-anywhere.herokuapp.com/${url}`,
//       {
//         headers: {
//           Origin: 'https://kami-backend-5rs0.onrender.com/services', // Hoặc thay thế bằng URL nguồn của bạn
//           'X-Requested-With': 'XMLHttpRequest', // Header này giúp xác nhận yêu cầu AJAX
//           'Content-Type': 'Application/json',
//         },
//       }
//     );

//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// const handleLogin = async () => {
//   try {
//     const response = await axios.post(
//       'https://kami-backend-5rs0.onrender.com/auth',
//       {
//         phone: phoneInput,
//         password: passwordInput,
//       }
//     );
//     if (response.status == 200) {
//       await AsyncStorage.setItem('token', response.data.token);
//       navigation.navigate('App');
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

const API_URL = 'https://kami-backend-5rs0.onrender.com/auth';

export default function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const login = async () => {
    try {
      const response = await axios.post(API_URL, { phone, password });

      if (response.data.token) {
        const token = response.data.token;
        // console.log('Login successful, Token:', token);

        // Store the token for future use
        await AsyncStorage.setItem('authToken', token);

        // Navigate to MyTab
        navigation.navigate('App');
      } else {
        Alert.alert('Login failed', 'No token returned.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login failed',
        'Please check your credentials and try again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.form}
        label="Phone"
        mode="outlined"
        placeholder="Phone"
        outlineStyle={{ borderRadius: 10 }}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text>{phone}</Text>
      <TextInput
        style={styles.form}
        label="Password"
        mode="outlined"
        outlineStyle={{ borderRadius: 10 }}
        secureTextEntry
        right={
          <TextInput.Icon
            onPress={() => setHidePassword((prev) => !prev)}
            icon={hidePassword ? 'eye' : 'eye-off'}
          />
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
      />
      <Button
        style={styles.button}
        labelStyle={styles.label}
        mode="contained"
        outlineStyle={{ borderRadius: 10 }}
        theme={{ colors: { primary: '#F26398' } }}
        onPress={login}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  heading: {
    textAlign: 'center',
    fontSize: 32,
    color: '#F26398',
    fontWeight: '700',
    marginBottom: 30,
  },
  form: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#ef536d',
    paddingVertical: 5,
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
});
