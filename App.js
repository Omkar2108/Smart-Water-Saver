import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import SignUp from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import Welcome from './screens/Welcome';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <FlashMessage position="top"/>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={({ navigation }) =>({
          headerLeft: () =>null,
          headerShown: false
        })}/>
        <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) =>({
          headerLeft: () =>null,
          headerShown: false
        })}
        />
        <Stack.Screen name="SignUp" component={SignUp} 
         options={({ navigation }) =>({
          headerShown: false
        })}/>
        <Stack.Screen name="ForgotPassword" 
        component={ForgotPassword} 
        options={({ navigation }) =>({
          // headerLeft: () =>null,
          // headerShown: false
        })}/>
        <Stack.Screen name="Welcome" component={Welcome} 
        options={({ navigation }) =>({
          headerLeft: () =>null,
          headerShown: false
        })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

