import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Transaction from './transaction';
import Customer from './customer';
import Setting from './setting';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const HomeTabarIcon = ({ color }) => (
  <Icon source={'home'} color={color} size={24} />
);

const TransactionTabBarIcon = ({ color }) => (
  <Icon source={'bank-transfer'} color={color} size={24} />
);

const CustomerTabBarIcon = ({ color }) => (
  <Icon source={'account-supervisor-outline'} color={color} size={24} />
);

const SettingTabBarIcon = ({ color }) => (
  <Icon source={'cog-outline'} color={color} size={24} />
);

const CustomBottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#F26398',
        tabBarInactiveTintColor: '#757575',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeTabarIcon,
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: TransactionTabBarIcon,
          tabBarLabel: 'Transaction',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarIcon: CustomerTabBarIcon,
          tabBarLabel: 'Customer',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: SettingTabBarIcon,
          tabBarLabel: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomBottomNavigation;