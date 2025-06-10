import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';
import { Text } from 'react-native'; // Thêm import Text
import Icon from 'react-native-vector-icons/MaterialIcons';
import Contacts from './Contacts';
import ProfileContact from './ProfileContact';
import Favorites from './Favorites';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function ContactsScreens() {
  return (
    <Stack.Navigator initialRouteName="Contacts" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
      <Stack.Screen name="ProfileContact" component={ProfileContact} options={{ title: 'Profile contact' }} />
    </Stack.Navigator>
  );
}

function FavoriteScreens() {
  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      <Stack.Screen name="ProfileContact" component={ProfileContact} options={{ title: 'Profile contact' }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  console.log('Rendering TabNavigator');
  return (
    <Tab.Navigator
      initialRouteName="Contacts" // Sửa thành "Contacts" thay vì "ContactsScreens"
      barStyle={{ backgroundColor: 'blue' }}
      labeled={false}
      activeColor="lightgrey"
      inactiveColor="grey">
      <Tab.Screen
        name="Contacts"
        component={ContactsScreens}
        options={{
          tabBarIcon: ({ color }) => <Icon name="format-list-bulleted" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreens}
        options={{
          tabBarIcon: ({ color }) => <Icon name="star" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ store }) {
  console.log('AppNavigator store:', store);
  if (!store || typeof store.getState !== 'function') {
    console.error('Invalid store provided to AppNavigator:', store);
    return <Text>Navigation initialization failed</Text>;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}