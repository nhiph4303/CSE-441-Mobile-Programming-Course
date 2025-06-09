import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card, Text, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Sửa component ProductSearchCard
const ProductSearchCard = ({ item, onPressCard }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPressCard(item.id)}>
      <Card>
        <Card.Cover source={{ uri: item.thumbnail }} />
        <Card.Title
          titleNumberOfLines={2}
          style={styles.title}
          titleVariant="titleLarge"
          title={item.title}
        />
        <Card.Content style={styles.content}>
          <Text numberOfLines={1} variant="labelLarge">
            Description: {item.description}
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Price: ${item.price}
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Discount: {item.discountPercentage}%
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Rating: {item.rating} stars
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Stock: {item.stock} units
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Brand: {item.brand}
          </Text>
          <Text numberOfLines={1} variant="labelLarge">
            Category: {item.category}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const filePath = 'https://dummyjson.com/products/';

const Product_Search = () => {
  const navigation = useNavigation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Tìm kiếm sản phẩm
  const searchProduct = async () => {
    if (searchValue !== '') {
      setIsLoading(true); // Bắt đầu loading
      try {
        const response = await fetch(`${filePath}/search?q=${searchValue}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Dừng loading khi hoàn thành
      }
    }
  };

  // Chuyển sang màn hình chi tiết
  const onPressCard = (id) => {
    navigation.navigate('Detail', { productId: id });
  };

  // Khi mở màn hình lần đầu tiên, tải tất cả sản phẩm
  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((d) => {
        setFilteredProducts(d.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ScrollView>
      <Text style={styles.header}>Product Search</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={(value) => {
          setSearchValue(value);
          searchProduct(); // Tìm kiếm khi thay đổi giá trị
        }}
        value={searchValue}
        onIconPress={searchProduct} // Tìm kiếm khi nhấn icon
        loading={isLoading} // Hiển thị loading khi đang tìm kiếm
      />

      {isLoading ? ( // Hiển thị "Loading..." nếu dữ liệu đang được tải
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredProducts}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <ProductSearchCard item={item} onPressCard={onPressCard} />
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#757375',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
  },
  title: {
    opacity: 0.7,
    marginVertical: 8,
  },
  content: {
    gap: 8,
  },
});

export default Product_Search;
