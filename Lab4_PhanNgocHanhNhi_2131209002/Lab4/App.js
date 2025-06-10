import 'react-native-get-random-values';
import React from 'react';
import { Text, View } from 'react-native'; // Thêm View để hiển thị lỗi rõ hơn
import { Store } from './src/Store';
import AppNavigator from './src/navigation';

const App = () => {
  console.log('Store in App - Raw:', Store); // Log raw để debug
  if (!Store || typeof Store.getState !== 'function') {
    console.error('Invalid Store in App:', Store);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Store initialization failed. Check console for details.</Text>
      </View>
    ); // Hiển thị lỗi rõ ràng
  }
  return <AppNavigator store={Store} />;
};

export default App;