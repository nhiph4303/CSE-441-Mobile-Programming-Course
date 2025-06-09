import { useState, useCallback, useEffect } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const filePath = 'https://dummyjson.com/products/';
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setError(null);

      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((d) => {
          setData(d.products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setIsLoading(false);
        });

      return () => {};
    }, [])
  );

  useEffect(() => {
    const { params } = route;
    if (params?.newProduct) {
      setData((prevData) => [params.newProduct, ...prevData]);
      navigation.setParams({ newProduct: null });
    }
  }, [route, navigation]);

  const onAddProduct = (newProduct) => {
    setData((prevData) => [newProduct, ...prevData]);
  };

 useEffect(() => {
  const { params } = route;
  if (params?.newProduct) {
    setData((prevData) => [params.newProduct, ...prevData]);
    navigation.setParams({ newProduct: null });
  }
}, [route, navigation]); // Add `navigation` as a dependency


  const handleAddProduct = (newProduct) => {
    setData((prevData) => [newProduct, ...prevData]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.thumbnail || 'https://via.placeholder.com/90' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text style={styles.text}>Description: {item.description}</Text>
        <Text style={styles.text}>Price: ${item.price}</Text>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}% off
        </Text>
        <Text style={styles.text}>Rating: {item.rating}/5</Text>
        <Text style={styles.text}>Stock: {item.stock}</Text>
        <Text style={styles.text}>Brand: {item.brand}</Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() =>
              navigation.navigate('Detail', { productId: item.id })
            }>
            DETAIL
          </Button>

          <Button
            style={styles.button}
            mode="contained"
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate('Add', { onAddProduct })}>
            ADD
          </Button>

          <Button
            style={styles.button}
            mode="contained"
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={() => handleDelete(item.id)}>
            DELETE
          </Button>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Error: {error}</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No product!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product list</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    flexShrink: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#757375',
    marginBottom: 10,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#757375',
  },
  text: {
    fontSize: 14,
    color: '#757375',
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#2296f3',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 35,
  },
  buttonLabel: {
    color: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    lineHeight: 12,
  },
});

export default Products;
