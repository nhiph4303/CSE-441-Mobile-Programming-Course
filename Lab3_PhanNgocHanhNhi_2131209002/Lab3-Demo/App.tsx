import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import Products from "./Products/Products"
import { StyleSheet } from "react-native"

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Products />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;