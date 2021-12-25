import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { TextInput, Button } from "react-native-paper";
import tw from "twrnc";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const auth = getAuth();
  useEffect(async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        showMessage({
          message: "Already Logged In !",
          type: "success",
          icon: "success",
        });
        navigation.navigate("Welcome");
      }
    });
  });

  const handleSubmit = async () => {
    if (
      email.length > 6 &&
      password.length > 6 &&
      confirmPassword === password
    ) {
      await createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then((res) => {
          // console.log(res);
          showMessage({
            message: "Account Created Successfully !",
            type: "success",
            icon: "success",
          });
          navigation.navigate("Welcome");
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
      setConfirmPassword("");
    } else if (password !== confirmPassword) {
      showMessage({
        message: "Passwords Doesn't match",
        type: "warning",
        icon: "warning",
      });
    } else {
      showMessage({
        message: "Enter correct Email/Password!",
        type: "warning",
        icon: "warning",
      });
    }
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.grad}>
            <View style={styles.imageBox}>
              <Image
                style={tw`w-25 h-25 self-center`}
                source={require("../assets/signup.png")}
              />
            </View>
            <Text style={tw`font-semibold text-3xl text-white text-center `}>
              Welcome
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
            <TextInput
              style={tw`mb-5`}
              label="Confirm Password"
              secureTextEntry={visible}
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => setVisible(!visible)}
                />
              }
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white text-lg text-center pt-1 font-normal`}>
                Create Account
              </Text>
            </TouchableOpacity>

            <Text style={tw`text-center text-lg font-semibold`}>
              {" "}
              Already have Account
            </Text>
            <Text
              style={tw`text-center text-lg font-bold text-blue-500`}
              onPress={() => navigation.navigate("Login")}
            >
              Login
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
    height: 160,
    backgroundColor: "#1f7882",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  input: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 9,
    height: 40,
    marginBottom: 15,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    color: "black",
  },

  images: {
    marginTop: 20,
    height: 60,
    width: 60,
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
    height: 390,
    justifyContent: "space-evenly",
  },
  container: {
    backgroundColor: "#F9F7F7",
    height: "100%",
    width: "100%",
  },
  button: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 9,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 10,
    marginBottom: 20,
    elevation: 25,
    height: 40,
    backgroundColor: "#1f7882",
    borderColor: "#7fffd4",
    borderRadius: 16,
  },
});

export default SignUp;
