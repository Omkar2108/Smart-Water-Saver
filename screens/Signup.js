import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignUp() {
    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.backgrad}></View>
          <View style={styles.box}>
            <View style={styles.grad}>
              <View style={styles.imageBox}>
                <Image
                  style={styles.images}
                  source={require("../assets/signup.png")}
                />
              </View>
              <Text style={styles.Headerfont}>Welcome</Text>
            </View>
            <View style={styles.flexing}>
              <Text style={styles.font}>Please Set Username and Passward</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="username"
                  placeholderTextColor="black"
                />
                <TextInput
                  style={styles.input}
                  placeholder="password"
                  placeholderTextColor="black"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
  
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "black" }}
                  />
                  <View>
                    <Text
                      style={{
                        width: 50,
                        textAlign: "center"
                      }}
                    >
                      OR
                    </Text>
                  </View>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "black" }}
                  />
                </View>
                <Text style={styles.font}>Sign Up With</Text>
  
                <View style={styles.auth}>
                  <TouchableOpacity
                    style={styles.authBtnBox}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Image
                      onPress={() => navigation.navigate("Login")}
                      source={require("../assets/google-symbol.png")}
                      style={[styles.authButten, { alignSelf: "center" }]}
                    />
                    <Text style={{ alignSelf: "center", marginTop: 7 }}>
                      Google
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.authBtnBox}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Image
                      onPress={() => navigation.navigate("Login")}
                      source={require("../assets/facebook.png")}
                      style={[styles.authButten, { alignSelf: "center" }]}
                    />
                    <Text style={{ alignSelf: "center", marginTop: 7 }}>
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    grad: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.26,
      shadowRadius: 8,
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: "space-between",
      height: 160,
      backgroundColor: "#1f7882",
      borderRadius: 10
    },
    backgrad: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.26,
      shadowRadius: 11,
      position: "absolute",
      elevation: 20,
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: "space-between",
      width: "100%",
      height: 220,
      backgroundColor: "#1f7882"
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
      color: "black"
    },
  
    images: {
      marginTop: 20,
      height: 60,
      width: 60,
      alignSelf: "center"
    },
    box: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.56,
      shadowRadius: 13,
      height: 600,
      textAlign: "center",
      marginTop: 70,
      marginLeft: 40,
      marginRight: 40,
      borderRadius: 20,
      backgroundColor: "#F9F7F7"
    },
    flexing: {
      height: 390,
      justifyContent: "space-evenly"
    },
    container: {
      backgroundColor: "#F9F7F7",
      height: "100%",
      width: "100%"
    },
    Headerfont: {
      marginBottom: 12,
      marginLeft: 20,
      marginRight: 20,
      alignSelf: "center",
      textShadowColor: "rgba(0, 0, 0, 0.6)",
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 6,
      elevation: 25,
      fontSize: 30,
      color: "#ffffff"
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
      marginTop: 15,
      marginBottom: 12
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
      borderRadius: 16
    },
    buttonText: {
      color: "#ffff",
      fontSize: 15,
      marginTop: 11
    },
    authButten: {
      height: "5%",
      width: "5%"
    },
    auth: {
      paddingLeft: 50,
      paddingRight: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      height: 10,
      marginTop: 2
    }
  });

export default SignUp;

