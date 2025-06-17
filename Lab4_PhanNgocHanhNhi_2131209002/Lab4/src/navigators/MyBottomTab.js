import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContactScreens, FavoriteScreens } from './StackScreens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactScreens"
      barStyle={{ backgroundColor: 'blue' }}
      labeled={false}
      barStyle={{ backgroundColor: 'blue' }}
      activeTintColor={'greyLight'}
      inactiveColor={'greyDark'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            ContactScreens: 'format-list-bulleted',
            FavoriteScreens: 'star-check',
          };

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={size}
            />
          );
        },
      })}>
      <Tab.Screen
        name="ContactScreens"
        component={ContactScreens}
        options={{}}
      />

      <Tab.Screen
        name="FavoriteScreens"
        component={FavoriteScreens}
        options={{}}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTab;
