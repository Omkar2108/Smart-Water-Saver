import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import ForgotPassword from "./screens/ForgotPassword";
import Welcome from "./screens/Welcome";
import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({ navigation }) => ({
            // headerLeft: () =>null,
            // headerShown: false
          })}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerShown: false,
          })}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
