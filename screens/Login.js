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
import { TextInput, Button } from "react-native-paper";
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
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.backgrad}></View>
        <View style={styles.box}>
          <View style={styles.grad}>
            <View style={styles.imageBox}>
              <TouchableOpacity onPress={() => console.log("done")}>
                <Image
                   style={tw`w-28 h-28 self-center`}
                  source={require("../assets/login-1.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={tw`font-semibold text-3xl text-white text-center `}>
              Welcome Back
            </Text>
          </View>

          <View>
            <TextInput
              style={tw`mt-5 `}
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              // textContentType="email"
            />

            <TextInput
              label="Password"
              secureTextEntry={visible}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => setVisible(!visible)}
                />
              }
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Text
              style={tw`text-right text-blue-500 font-semibold text-sm m-2`}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text
                style={tw`text-white text-xl font-semibold text-center pt-1`}
              >
                Login
              </Text>
            </TouchableOpacity>

            <Text
              style={tw`text-center text-black text-lg pt-10 pb-1 font-semibold`}
            >
              Or Sign Up using
            </Text>

            <Text
              style={tw`font-bold text-lg text-center text-blue-500`}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  grad: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    height: 180,
    backgroundColor: "#1f7882",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  images: {
    marginTop: 20,
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  box: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.56,
    shadowRadius: 13,
    height: 530,
    textAlign: "center",
    marginTop: 100,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    backgroundColor: "#F9F7F7",
    borderColor: "#1f7882",
    borderWidth: 1.5,
  },
  flexing: {
    height: 320,
    justifyContent: "space-evenly",
  },
  container: {
    backgroundColor: "#F9F7F7",
    height: "100%",
    width: "100%",
  },
  font: {
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.100000000)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
    fontSize: 20,
    color: "#1f7882",
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 9,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 5,
    elevation: 25,
    height: 40,
    backgroundColor: "#1f7882",
    borderColor: "#7fffd4",
    // padding: 12,
    borderRadius: 16,
  },
});

export default Login;
