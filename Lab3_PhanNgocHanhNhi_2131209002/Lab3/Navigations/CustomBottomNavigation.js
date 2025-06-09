import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from '../Products/Products';
import Product_Add from '../Products/Product_Add';
import Product_Search from '../Products/Product_Search';
import Product_Detail from '../Products/Product_Detail';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const ProductListTabBarIcon = ({ color }) => (
  <Icon source={'format-list-bulleted'} color={color} size={24} />
);

const ProductAddTabBarIcon = ({ color }) => (
  <Icon source={'file-plus-outline'} color={color} size={24} />
);

const ProductSearchTabBarIcon = ({ color }) => (
  <Icon source={'file-search-outline'} color={color} size={24} />
);

const ProductDetailIcon = ({ color }) => (
  <Icon source={'clipboard-text-outline'} color={color} size={24} />
);

const CustomBottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator initialRouteName="Products">
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ProductListTabBarIcon,
          tabBarLabel: 'Products',
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Add"
        component={Product_Add}
        options={{
          tabBarIcon: ProductAddTabBarIcon,
          tabBarLabel: 'Add',
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Search"
        component={Product_Search}
        options={{
          tabBarIcon: ProductSearchTabBarIcon,
          tabBarLabel: 'Search',
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: '#757575',
        }}
      />

      <Tab.Screen
        name="Detail"
        component={Product_Detail}
        options={{
          tabBarIcon: ProductDetailIcon,
          tabBarLabel: 'Detail',
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: '#757575',
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomBottomNavigation;
