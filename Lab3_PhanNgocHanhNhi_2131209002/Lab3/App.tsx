/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Products from './Products/Products';
import { SafeAreaView } from 'react-native-safe-area-context';

function App(): React.JSX.Element {

  return (
   <SafeAreaView>
    <Products/>
   </SafeAreaView>
  );
}

export default App;
