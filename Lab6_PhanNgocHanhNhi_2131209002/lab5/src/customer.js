import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { FlatList, Text } from 'react-native-gesture-handler';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

export default function Customer({ navigation }) {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    async function getCustomer() {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers'
      );
      console.log(response.data);
      setCustomer(response.data);
    }
    getCustomer();
  }, []);

  const renderItem = (item) => (
    <View style={styles.containerCustomer}>
      <View>
        <Text>
          <Text style={styles.title}>Customer: </Text>
          {item.name}
        </Text>
        <Text>
          <Text style={styles.title}>Phone: </Text>
          {item.phone}
        </Text>
        <Text>
          <Text style={styles.title}>Total money: </Text>
          <Text style={styles.price}>
            {item.totalSpent.toLocaleString('vi-VN')}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </Text>
      </View>
      <View style={styles.containerStatus}>
        <Foundation name="crown" size={25} color="#ef536d" />
        <Text style={styles.loyalty}>
          {item.loyalty.charAt(0).toUpperCase() + item.loyalty.slice(1)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#ef536d' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Customer</Text>
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={customer}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => renderItem(item)}
          />
          <View style={styles.add}>
            <Pressable onPress={() => navigation.navigate('AddCustomer')}>
              <Icon name="add-circle" size={50} color="#ef536d" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    backgroundColor: '#ef536d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
  containerCustomer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 50,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  flatList: {
    paddingBottom: 130,
    paddingTop: 20,
  },
  title: {
    color: '#828282',
    fontWeight: 'bold',
  },
  price: {
    color: '#ef536d',
    fontWeight: 'bold',
  },
  currency: {
    color: '#ef536d',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  containerStatus: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loyalty: {
    color: '#ef536d',
    fontWeight: 'bold',
  },
  add: {
    paddingTop: 30,
    paddingRight: 20,
    position: 'absolute',
    bottom: 140,
    zIndex: 2,
    right: 0,
  },
});