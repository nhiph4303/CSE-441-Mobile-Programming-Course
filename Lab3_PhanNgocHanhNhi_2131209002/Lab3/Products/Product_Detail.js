import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const route = useRoute();
  const { productId } = route.params; // Nhận ID sản phẩm từ params

  // Fetch thông tin chi tiết sản phẩm
  useEffect(() => {
    const filePath = `https://dummyjson.com/products/${productId}`;
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch product details');
      });
  }, [productId]);

  // Kiểm tra nếu product chưa được load
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Product detail</Text>
      <Card>
        <Card.Cover source={{ uri: product.thumbnail }} />
        <Card.Title
          title={product.title}
          subtitle={`Price: ${product.price}`}
        />
        <Card.Content>
          <Text style={styles.text}>Description: {product.description}</Text>
          <Text style={styles.text}>
            Discount: {product.discountPercentage}% off
          </Text>
          <Text style={styles.text}>Rating: {product.rating} stars</Text>
          <Text style={styles.text}>Stock: {product.stock} units</Text>
          <Text style={styles.text}>Brand: {product.brand}</Text>
          <Text style={styles.text}>Category: {product.category}</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => Alert.alert('Delete Button Pressed')}
          style={styles.button}>
          DELETE
        </Button>
        <Button
          mode="contained"
          onPress={() => Alert.alert('Cancel Button Pressed')}
          style={styles.button}>
          CANCEL
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#757375',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 4,
    color: '#757575',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
});

export default ProductDetail;
