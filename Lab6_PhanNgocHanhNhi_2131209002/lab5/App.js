import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CustomBottomNavigation from './src/bottomNavigate';
import MyStack from './src/stackNavigate';
export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    // <Login/>
    // </SafeAreaView>

    // <NavigationContainer>
    //   <CustomBottomNavigation />
    // </NavigationContainer>

   <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
