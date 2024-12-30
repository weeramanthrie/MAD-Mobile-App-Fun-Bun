import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Signupscreen from './screens/Signupscreen';
import HomeScreen from './screens/HomeScreen';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import store from './screens/Store';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store ={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "SignUp" component={Signupscreen} />
        <Stack.Screen name = "Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;