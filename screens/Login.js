import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Firebase from "../firebase";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-paper";
import tw from "twrnc";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const auth = getAuth(Firebase);

  useEffect(async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        showMessage({
          message: "Already Logged In !",
          type: "success",
          icon: "success",
        });
        setEmail("");
        setPassword("");
        navigation.navigate("Welcome");
      }
    });
  });

  const handleSubmit = async () => {
    if (email.length > 5 && password.length > 5) {
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then((res) => {
          // console.log(res);
          showMessage({
            message: "Log In Suceessfully!",
            type: "success",
            icon: "auto",
          });
        })
        .catch((err) => {
          // console.log(err);
          showMessage({
            message: err.message,
            type: "danger",
            icon: "danger",
          });
        });
      setEmail("");
      setPassword("");
    } else {
      showMessage({
        message: "Enter Email/Password Correctly!",
        type: "warning",
        icon: "warning",
      });
    }
  };

  return (
    <KeyboardAwareScrollView >
      <View style={tw`h-full w-full`}>
        <View style={tw`justify-center mt-20`}>
          <View style={tw``}>
                <Image
                  style={tw`w-28 h-28 self-center`}
                  source={require("../assets/login-1.png")}
                />
            <Text style={tw`font-semibold text-3xl text-blue-400 text-center `}>
              Welcome Back
            </Text>
          </View>

          <View>
            <TextInput
              style={tw`mt-5 mx-10 text-lg`}
              mode='outlined'
              left={<TextInput.Icon name="email-outline"/>}
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <TextInput
              style={tw`mt-5 mx-10 text-lg`}
              mode='outlined'
              label="Password"
              secureTextEntry={visible}
              left={<TextInput.Icon name="lock-outline"/>}
              right={visible?
                <TextInput.Icon
                  name="eye"
                  onPress={() => setVisible(false)}
                />:
                <TextInput.Icon
                  name="eye-off"
                  onPress={() => setVisible(true)}
                />
              }
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Text
              style={tw`text-right text-blue-500 font-semibold text-sm mr-10 mt-1 `}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>

            <TouchableOpacity
              style={tw`mt-3 mx-8 h-auto text-lg bg-blue-400 rounded-lg p-2`}
              onPress={() => handleSubmit()}
            >
              <Text
                style={tw`text-white text-xl font-semibold text-center `}
              >
                L O G  I N
              </Text>
            </TouchableOpacity>

            <Text
              style={tw`text-center text-black text-lg pt-10 pb-1 font-semibold`}
            >
              Don't have an account? 

            <Text
              style={tw`font-bold text-lg text-center text-blue-500`}
              onPress={() => navigation.navigate("SignUp")}
            >
              {" "}Sign Up
            </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
