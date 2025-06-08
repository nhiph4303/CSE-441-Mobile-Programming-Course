import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CustomBottomNavigation from './Navigations/CustomBottomNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <CustomBottomNavigation/>
      </NavigationContainer>
  );
}

export default App;