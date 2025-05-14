

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Products from './Products/Products';
import { BottomNavigation } from 'react-native-paper';
import Product_Add from './Products/Product_Add';

const App = (): React.JSX.Element => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ProductList', title: "Products", focusedIcon: "folder"},
    {key: 'Product_Add', title: "Add", focusedIcon: "folder"},
    {key: 'ProductSearch', title: "Search", focusedIcon: "find"},
    {key: 'ProductDetail', title: "Detail", focusedIcon: "calendar"},
  ]);

const renderScene = BottomNavigation.SceneMap({
  ProductList: Products,
  Product_Add :Product_Add
});

  return (
    <View style={styles.container}>
      {/* <BottomNavigation onIndexChange={setIndex} renderScene={renderScene}/> */}
      <Products/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
