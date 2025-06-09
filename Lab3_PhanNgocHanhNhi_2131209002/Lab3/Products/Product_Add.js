import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const Product_Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      title,
      description,
      price: price || '0',
      discountPercentage: discountPercentage || '0',
      rating: rating || '0',
      stock: stock || '0',
      brand,
      category,
      images,
      thumbnail: 'https://via.placeholder.com/90', // Giả lập thumbnail
    };

    console.log('New Product in Product_Add:', newProduct); // Debug
    Alert.alert('Add successful'); // Hiển thị thông báo ngay lập tức
    const onAddProduct = route.params?.onAddProduct;
    if (onAddProduct) {
      console.log('Calling onAddProduct'); // Debug
      onAddProduct(newProduct); // Gọi callback
    } else {
      console.log('onAddProduct not found in params'); // Debug
    }
    // Thay goBack bằng navigate để đảm bảo params được truyền
    navigation.navigate('Products', { newProduct });
  };

  return (
    <ScrollView style={style.container}>
      <Text style={style.header}>Add Product</Text>
      <View>
        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          label="Title"
        />
      </View>

      <View>
        <TextInput
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          label="Description"
        />
      </View>

      <View>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          mode="outlined"
          label="Price"
        />
        <HelperText style={{ display: price ? 'flex' : 'none' }}>
          Price: {price || '0'}
        </HelperText>
      </View>

      <View>
        <TextInput
          value={discountPercentage}
          onChangeText={setDiscountPercentage}
          keyboardType="numeric"
          mode="outlined"
          label="Discount Percentage"
        />
        <HelperText style={{ display: discountPercentage ? 'flex' : 'none' }}>
          Discount Percentage: {discountPercentage || '0'}
        </HelperText>
      </View>

      <View>
        <TextInput
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
          mode="outlined"
          label="Rating"
        />
        <HelperText style={{ display: rating ? 'flex' : 'none' }}>
          Rating: {rating || '0'}
        </HelperText>
      </View>

      <View>
        <TextInput
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
          mode="outlined"
          label="Stock"
        />
        <HelperText style={{ display: stock ? 'flex' : 'none' }}>
          Stock: {stock || '0'}
        </HelperText>
      </View>

      <View>
        <TextInput
          value={brand}
          onChangeText={setBrand}
          mode="outlined"
          label="Brand"
        />
      </View>

      <View>
        <TextInput
          value={category}
          onChangeText={setCategory}
          mode="outlined"
          label="Category"
        />
      </View>

      <View>
        <TextInput
          value={images}
          onChangeText={setImages}
          mode="outlined"
          label="Images"
        />
      </View>

      <Button onPress={handleSubmit} style={style.submitBtn} mode="contained">
        SUBMIT
      </Button>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#757375',
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
    gap: 8,
  },
  submitBtn: {
    marginVertical: 16,
  },
});

export default Product_Add;