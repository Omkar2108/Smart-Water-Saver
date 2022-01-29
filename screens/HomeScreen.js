import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FadeInView from "../components/fadeInView";
import tw from "twrnc";

function HomeScreen({ navigation }) {
  return (
    <View style={tw`w-full h-full justify-between`}>
      <ImageBackground
        source={require("../assets/4.jpg")}
        resizeMode="cover"
        style={tw`w-full h-full`}
      >
        <FadeInView>
          <View style={tw`w-full h-full justify-between`}>
            <View>
              <Text
                style={tw`text-black font-bold text-3xl text-center mt-20`}
              >
                You are one step away from saving water !
              </Text>
            </View>

            <View style={tw`flex-col`}>
              <TouchableOpacity
                // style={styles.button}
                style={tw`h-auto p-5 rounded-lg mx-10 `}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={tw`text-2xl text-blue-400 font-semibold text-center`}>
                  L O G I N
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // style={styles.button}
                style={tw`h-auto p-5 rounded-lg mx-10 my-5`}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={tw`text-2xl text-blue-400 font-semibold text-center`}>
                  S I G N U P
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;
