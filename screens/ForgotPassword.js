import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextInput } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import tw from "twrnc";

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (email.length > 5) {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
        .then((res) => {
          // console.log(res);
          if (res === undefined) {
            showMessage({
              message: "Link Send to Email !",
              type: "success",
              icon: "success",
            });
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          // console.log(err.message);
          showMessage({
            message: err.message,
            type: "danger",
            icon: "danger",
          });
        });
    } else {
      showMessage({
        message: "Enter correct Email !",
        type: "warning",
        icon: "warning",
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={tw`h-full w-full mt-20`}>
        <View style={tw``}>
          <View style={tw``}>
              <Image
                style={tw`w-30 h-30 self-center`}
                source={require("../assets/login-1.png")}
              />
            <Text style={tw`font-semibold text-3xl text-blue-400 text-center `}>
              Forgot Password
            </Text>
          </View>
          <View>
            <TextInput
              style={tw`my-5 text-lg mx-10`}
              label="Email"
              mode="outlined"
              left={<TextInput.Icon name="email-outline"/>}
              onChangeText={(text) => setEmail(text)}
              value={email}
              // textContentType="email"
            />
            <TouchableOpacity
              // style={styles.button}
              style={tw`h-auto p-2 rounded-lg bg-blue-400 mx-8`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`font-semibold text-xl text-white text-center`}>Send Link to Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ForgotPassword;
