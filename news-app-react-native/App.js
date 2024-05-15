import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import NewsDetail from './components/NewsDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ana Sayfa">
        <Stack.Screen name="Ana Sayfa" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
