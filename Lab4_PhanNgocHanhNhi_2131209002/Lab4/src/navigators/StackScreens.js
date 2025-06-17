import { createStackNavigator } from "@react-navigation/stack";
import Contacts from "../components/Contact";
import ProfileContact from "../components/ProfileContact";
import Favorites from "../components/Favorites";

const Stack = createStackNavigator();

export const ContactScreens = () => {
    console.log("ContactScreen");
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{
                    title: "Contacts"
                }}
            />

            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{
                    title: "Profile Contact"
                }}
            />
        </Stack.Navigator>
    );
};

export const FavoriteScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    title: "Favorites"
                }}
            />

            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{
                    title: "Profile contact"
                }}
            />
        </Stack.Navigator>
    );
};
