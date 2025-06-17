import "./gesture-handler";
import { Text } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import MyBottomTab from "./src/navigators/MyBottomTab";

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <MyBottomTab />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
