import { View , Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FadeInView from '../components/fadeInView';
function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground
            source={require("../assets/4.jpg")}
            resizeMode="cover"
            style={styles.image}
            >

             <FadeInView>
                <View style={styles.container}>
                    <View style={styles.textBox}>
                    <Text style={styles.font}>
                        You are one step away from saving water !
                    </Text>
                    </View>

                    <View style={styles.fixToText}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.buttonText}>L O G I N</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.buttonText}>S I G N U P</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </FadeInView>
            {/* <Button  title="Login" onPress={()=>  navigation.navigate("Login")}></Button>
            <Button  title="Sign Up"  onPress={()=>  navigation.navigate("SignUp")}></Button> */}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%",
      justifyContent: "space-between"
    },
    image: {
      width: "100%",
      height:"100%"
    },
    textBox: {
      justifyContent: "center",
      textAlign: "center",
      marginTop: 52,
      marginLeft: "10%",
      height: "auto",
      width: "80%",
      padding: 12,
      borderRadius: 12
    },
    font: {
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowOffset: { width: -5, height: 5 },
      textShadowRadius: 6,
      fontWeight: "bold",
      fontSize: 32,
      color: "#010014",
      alignItems:'center',
      justifyContent:'center',
    //   flex:'col'
    },
    fixToText: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      marginBottom: "5%"
    },
  
    button: {
      shadowColor: "#7fffd4",
      shadowOffset: { width: -4, height: 4 },
      shadowOpacity: 0.29,
      shadowRadius: 9,
      marginLeft: "7%",
      marginBottom: "5%",
      height: 49,
      width: "86%",
      backgroundColor: "#000000",
      borderColor: "#7fffd4",
    //   borderWidth: ,
      padding: 13,
      borderRadius: 12
    },
    buttonText: {
      color: "#20b2aa",
      fontSize: 15,
      alignSelf: "center"
    }
  });


export default HomeScreen;
