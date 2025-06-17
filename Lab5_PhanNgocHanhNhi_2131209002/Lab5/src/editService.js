import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function EditService({ navigation, route }) {
  const item = route.params;
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price.toString());
  const [token, setToken] = useState(null);

  async function update() {
    try {
      const response = await axios.put(
        `https://kami-backend-5rs0.onrender.com/services/${item._id}`,
        {
          name,
          price: Number(price),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      console.error(e);
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
          label={'Service name'}
          style={{ marginBottom: 20 }}
          theme={{ roundness: 10 }}
          mode="outlined"
        />
        <Text style={styles.title}>Price *</Text>
        <TextInput
          onChangeText={(value) => {
            setPrice(value);
          }}
          value={price}
          label={'Price'}
          style={{ marginBottom: 10 }}
          theme={{ roundness: 10 }}
          mode="outlined"
        />
        <Button
          onPress={() => update()}
          mode="contained"
          style={styles.button}
          labelStyle={styles.label}>
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ef536d',
    padding: 10,
    marginTop:-10,
    marginHorizontal:-10,
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
  },
  label: {
    fontSize: 18,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
});
