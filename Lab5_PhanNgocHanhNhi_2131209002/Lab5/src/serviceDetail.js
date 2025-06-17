import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Menu, Divider, Provider } from 'react-native-paper';
import axios from 'axios';

export default function ServiceDetail({ navigation, route }) {
  const item = route.params;
  const [token, setToken] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('ServiceDetail - Item:', item);
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.icon} onPress={() => setVisible(true)}>
          <Feather
            name="more-vertical"
            size={22}
            color="white"
            style={styles.iconStyle}
          />
        </Pressable>
      ),
    });
  }, [item]);

  // Handle deletion with the confirmation modal
  const handleDelete = async () => {
    if (!item?._id) {
      console.log('Item ID is missing');
      return;
    }
    try {
      const response = await axios.delete(
        `https://kami-backend-5rs0.onrender.com/services/${item._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data); // Ensure delete works
      setVisible(false); // Close the menu after deletion
      navigation.goBack(); // Navigate back after deletion
    } catch (e) {
      console.error("Error deleting service:", e);
    }
  };

  // Display the confirmation alert when "Delete Service" is clicked
  const deleteModal = () => {
    console.log('Delete modal triggered'); // Debugging log
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleting service'); // Debugging log
            handleDelete(); // Perform deletion after confirmation
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon
              style={{ marginLeft: 18 }}
              name="arrow-back"
              size={25}
              color="white"
              onPress={() => navigation.navigate('Home')}
            />
            <Text style={styles.headerTitle}>Service detail</Text>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <Pressable style={styles.icon} onPress={() => setVisible(true)}>
                  <Feather name="more-vertical" size={22} color="white" />
                </Pressable>
              }
            >
              <Menu.Item onPress={deleteModal} title="Delete Service" />
              <Divider />
              {/* Add more options if needed */}
            </Menu>
          </View>
          <Text style={styles.text}>
            <Text style={styles.title}>Service name:</Text> {item?.name || 'Not available'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>Price:</Text> {item?.price?.toLocaleString('vi-VN') || 'Not available'}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>Creator:</Text> {item?.createdBy || 'Not available'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>Time:</Text> {item?.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : 'Not available'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.title}>Final update:</Text> {item?.updatedAt ? new Date(item.updatedAt).toLocaleString('vi-VN') : 'Not available'}
          </Text>
          <Button
            onPress={() => navigation.navigate('EditService', item)}
            mode="contained"
            style={styles.button}
            labelStyle={styles.label}>
            Edit
          </Button>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ef536d',
    marginTop: -10,
  },
  headerTitle: {
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 7,
  },
  content: {
    paddingTop: 10,
  },
  title: {
    marginVertical: 7,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 7,
  },
  iconStyle: {
    marginRight: 10,
    paddingTop: 5,
  },
  icon: {
    paddingLeft: 10, // Add space to the left of the icon for better clickability
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
  currency: {
    textDecorationLine: 'underline',
  },
});
