import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from './Products/Products';
import Product_Add from './Products/Product_Add';
import Product_Search from './Products/Product_Search';
import Product_Detail from './Products/Product_Detail';


const Tab = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Profile: ProfileScreen,
    },
});

const CustomBottomNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Product_List">
            <Tab.Screen
                name="ProductList"
                component={Products}
                options={{
                    tabBarIcon: 
                }
                    
                }
            />
        </Tab.Navigator>
    );
}

export default CustomBottomNavigation;