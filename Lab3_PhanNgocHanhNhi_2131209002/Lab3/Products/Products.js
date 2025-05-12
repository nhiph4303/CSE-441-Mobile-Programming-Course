import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {red100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

const Products = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text style={styles.text}>Description: {item.description}</Text>
        <Text style={styles.text}>Price: {item.price}</Text>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage} off
        </Text>
        <Text style={styles.text}>Rating: {item.rating}</Text>
        <Text style={styles.text}>Stock: {item.stock}</Text>
        <Text style={styles.text}>Brand: {item.brand}</Text>
        <Text style={styles.text}>Category: {item.category}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel}>
            DETAIL
          </Button>
          <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel}>
            ADD
          </Button>
          <Button style={styles.button} mode="contained" contentStyle={styles.buttonContent} labelStyle={styles.buttonLabel}>
            DELETE
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Product list</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
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
    flex:1,
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
    gap:8,
  },
  button: {
    borderRadius: 1,
    //width:50,
    backgroundColor: '#2296f3',
  },
  buttonContent:{
    paddingHorizontal:0,
    paddingVertical:0,
    height:35,
  },
  buttonLabel:{
    color:'#fff',
    paddingHorizontal:0,
    paddingVertical:0,
    marginHorizontal:0,
    marginVertical:0,
    lineHeight:12,
  },
});

export default Products;
