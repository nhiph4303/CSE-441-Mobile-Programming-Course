import 'react-native-gesture-handler';
import Login from './login';
import Home from './home';
import BottomNavigate from './bottomNavigate';
import AddService from './addService'; // Import màn hình AddService
import ServiceDetail from './serviceDetail';
import EditService from './editService';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="App" component={BottomNavigate} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
       <Stack.Screen name="EditService" component={EditService} />
    </Stack.Navigator>
  );
}
