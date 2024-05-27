import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import NewsDetail from './components/NewsDetail';
import CategoryNewsScreen from './components/CategoryNewsScreen';
import TypeNewsScreen from './components/TypeNewsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [role, setRole] = useState(''); // Corrected destructuring assignment

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`http://10.2.28.145:8080/user/isLogin`, { method: 'GET' });
        const data = await response.json();
        setRole(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus(); // Call the async function
  }, []); // Added dependency array

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ana Sayfa">
        <Stack.Screen name="Ana Sayfa" component={HomeScreen} options={{ headerShown: false }} />
        {role === "anonymous" && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryNews" component={CategoryNewsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TypeNews" component={TypeNewsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
