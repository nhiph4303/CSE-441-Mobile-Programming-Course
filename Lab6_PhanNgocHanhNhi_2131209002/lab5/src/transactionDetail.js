import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import axios from 'axios';
import Iconn from 'react-native-vector-icons/Ionicons';

export default function TransactionDetail({ navigation, route }) {
  const item = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.icon}>
          <Icon source="dots-vertical" size={30} color="white" />
        </Pressable>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#ef536d' }}>
       <View style={styles.header}>
          <Iconn
            name="arrow-back"
            size={25}
            color="white"
            onPress={() => navigation.navigate('Transaction')}
          />
          <Text style={styles.headerTitle}>Transaction Detail</Text>
        </View>
        <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.pinkBold}>General information</Text>
          <View style={styles.row}>
            <Text style={styles.grayBold}>Transaction code</Text>
            <Text style={styles.blackBold}>{item.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.grayBold}>Customer</Text>
            <Text style={styles.blackBold}>
              {item.customer.name} - {item.customer.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.grayBold}>Creation time</Text>
            <Text style={styles.blackBold}>
              {new Date(item.createdAt).toLocaleDateString('vi-VN')}{' '}
              {new Date(item.createdAt).toLocaleTimeString('vi-VN')}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.pinkBold}>Services list</Text>
          {item.services.map((service) => (
            <View key={service._id} style={styles.rowService}>
              <Text style={{ flex: 2 }}>{service.name}</Text>
              <Text style={styles.quantity}>x {service.quantity}</Text>
              <Text style={styles.price}>
                {(service.price * service.quantity).toLocaleString('vi-VN')}{' '}
                <Text style={styles.currency}>đ</Text>
              </Text>
            </View>
          ))}
          <View style={styles.total}>
            <Text style={styles.grayBold}>Total</Text>
            <Text style={styles.blackBold}>
              {item.priceBeforePromotion.toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.pinkBold}>Cost</Text>
          <View style={styles.row}>
            <Text style={styles.grayBold}>Amount of money</Text>
            <Text style={styles.blackBold}>
              {item.priceBeforePromotion.toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.grayBold}>Discount</Text>
            <Text style={styles.blackBold}>
              -
              {(item.priceBeforePromotion - item.price).toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.blackBold}>Total payment</Text>
            <Text style={styles.pinkBold}>
              {item.price.toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  blackBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  pinkBold: {
    fontWeight: 'bold',
    color: '#ef536d',
    marginBottom: 5,
  },
  grayBold: {
    color: '#828282',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    color: '#828282',
  },
  price: {
    flex: 1,
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
  },
  currency: {
    textDecorationLine: 'underline',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
});
