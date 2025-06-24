import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Transaction({ navigation }) {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    async function getTransaction() {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/transactions'
      );
      console.log(response.data);
      setTransaction(response.data);
    }
    getTransaction();
  }, []);

  const renderItem = (item) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('vi-VN');
    const formattedHour = date.getHours();
    const formattedMinute = date.getMinutes();

    return (
      <Pressable onPress={() => navigation.navigate('TransactionDetail', item)}>
        <View style={styles.containerTransaction}>
          <View style={styles.information}>
            <Text style={styles.title}>
              {item.id} - {formattedDate} {formattedHour}:{formattedMinute}
              <Text style={styles.titleRed}>
                {' '}
                - {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </Text>
            {item.services.map(service => (
              <Text key={service._id} numberOfLines={1} ellipsizeMode="tail">
                - {service.name}
              </Text>
            ))}
            <Text style={styles.customer}>Customer: {item.customer.name}</Text>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
              {item.price.toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#ef536d' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transaction</Text>
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={transaction}
            keyExtractor={item => item.id}
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
  containerTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  information: {
    width: 270,
  },
  flatList: {
    paddingBottom: 130,
    paddingTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  titlePink: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ef536d',
  },
  titleRed: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'red',
  },
  customer: {
    color: '#828282',
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
  containerPrice: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 20,
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