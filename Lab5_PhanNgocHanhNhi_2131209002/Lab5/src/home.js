import React, { useState, useEffect } from 'react';
import {
  Pressable,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  const [service, setService] = useState([]); // Không cần kiểu dữ liệu

  useEffect(() => {
    // Lấy danh sách dịch vụ từ API
    async function getService() {
      try {
        const url = 'https://kami-backend-5rs0.onrender.com/services';
        const response = await axios.get(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, // Sử dụng proxy khác
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );
        console.log('Dữ liệu trả về từ API:', response.data); // Kiểm tra dữ liệu trả về
        setService(response.data); // Cập nhật state với dữ liệu dịch vụ
      } catch (error) {
        console.error('Error fetching data:', error); // Lỗi trong quá trình gửi yêu cầu
      }
    }
    getService();
  }, []); // Chạy một lần khi component mount

  // Render từng dịch vụ
  // Inside the renderItem method of Home.js
  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('ServiceDetail', item)}>
      {/* Directly passing the full item object */}
      <View style={styles.containerService}>
        <Text style={styles.titleList}>{item.name}</Text>
        <Text>
          {item.price.toLocaleString('vi-VN')}{' '}
          <Text style={styles.currency}>đ</Text>
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#ef536d' }}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>HUYỀN TRINH</Text>
          <Icon name="person-circle" size={40} color="white" />
        </View>

        {/* Logo */}
        <Image
          style={styles.image}
          source={require('../assets/images/logo.jpg')}
        />

        {/* Danh sách dịch vụ */}
        <View style={styles.containerList}>
          <Text style={styles.titleList}>Danh sách dịch vụ</Text>
          <Icon
            name="add-circle"
            size={35}
            color="#ef536d"
            onPress={() => navigation.navigate('AddService')} // Điều hướng đến màn hình thêm dịch vụ
          />
        </View>

        {/* FlatList để hiển thị danh sách dịch vụ */}
        <FlatList
          data={service}
          keyExtractor={(item) => item._id} // Sử dụng _id cho keyExtractor
          renderItem={renderItem}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  containerService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
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
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    marginHorizontal: 85,
    color: 'red',
  },
  containerList: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleList: {
    color: 'black',
    fontWeight: 'bold',
  },
  currency: {
    textDecorationLine: 'underline',
  },
  flatList: {
    marginBottom: 390,
  },
});
