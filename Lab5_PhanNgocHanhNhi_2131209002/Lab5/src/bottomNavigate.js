import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Transaction from './transaction';
import Customer from './customer';
import Setting from './setting';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeTabarIcon,
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#F26398',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: TransactionTabBarIcon,
          tabBarLabel: 'Transaction',
          tabBarActiveTintColor: '#F26398',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          tabBarIcon: CustomerTabBarIcon,
          tabBarLabel: 'Customer',
          tabBarActiveTintColor: '#F26398',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: SettingTabBarIcon,
          tabBarLabel: 'Setting',
          tabBarActiveTintColor: '#F26398',
          tabBarInactiveTintColor: '#757575',
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomBottomNavigation;
