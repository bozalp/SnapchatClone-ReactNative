import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from './src/Pages/HomeTabs';
import SignUp from './src/Pages/SignUp';
import SignIn from './src/Pages/SignIn';
import SplashScreen from './src/Pages/SplashScreen';
import Theme from './src/Pages/Settings/Theme';

import { Provider } from 'react-redux';
import { store } from "./src/Toolkits/store";
import { setDark, setLight } from './src/Toolkits/themeSlice';
import lightTheme from './src/Themes/light';
import darkTheme from './src/Themes/dark';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
            headerShown: false
          }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{
            headerShown: false
          }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{
            headerShown: false
          }} />
          <Stack.Screen name="HomeScreens" component={HomeScreens} options={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
