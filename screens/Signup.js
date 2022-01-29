import { View, Text, Image, TouchableOpacity } from "react-native";
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
  const [visible1, setVisible1] = useState(true);
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
    <KeyboardAwareScrollView style={tw``}>
      <View style={tw`w-full h-auto `}>
        <View style={tw``}>
          <View style={tw`mt-20`}>
              <Image
                style={tw`w-25 h-25 self-center`}
                source={require("../assets/signup.png")}
              />
            <Text style={tw`font-semibold text-3xl text-blue-400 text-center `}>
              Welcome
            </Text>
          </View>
          <View>
            <TextInput
              style={tw`mt-5 mx-10 text-lg`}
              left={<TextInput.Icon name="email-outline"/>}
              label="Email"
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
              value={email}
              // textContentType="email"
            />

            <TextInput
            style={tw`mx-10 my-3 text-lg`}
              label="Password"
              mode="outlined"
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
            <TextInput
              style={tw`mb-5 mx-10 text-lg`}
              mode="outlined"
              label="Confirm Password"
              secureTextEntry={visible1}
              right={visible1?
                <TextInput.Icon
                  name="eye"
                  onPress={() => setVisible1(false)}
                />:
                <TextInput.Icon
                  name="eye-off"
                  onPress={() => setVisible1(true)}
                />
              }
              left={<TextInput.Icon name="lock-outline"/>}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            <TouchableOpacity
              style={tw`h-auto p-2 bg-blue-400 mx-8 rounded-lg`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white text-xl text-center  `}>
                Create Account
              </Text>
            </TouchableOpacity>

            <Text style={tw`text-center text-lg font-semibold mt-20`}>
              {" "}
              Already have Account!

            <Text
              style={tw`text-center text-lg font-bold text-blue-500 `}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}Login
            </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SignUp;
