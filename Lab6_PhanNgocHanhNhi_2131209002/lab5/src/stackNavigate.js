import 'react-native-gesture-handler';
import Login from './login';
import Home from './home';
import BottomNavigate from './bottomNavigate';
import AddService from './addService'; // Import màn hình AddService
import ServiceDetail from './serviceDetail';
import EditService from './editService';
import AddCustomer from './addCustomer';
import Customer  from './customer';
import TransactionDetail from './transactionDetail';
import Transaction from './transaction';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      //initialRouteName="App"
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="App" component={BottomNavigate} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="Transaction" component={Transaction} />

    </Stack.Navigator>
  );
}
