import { useNavigation } from "@react-navigation/native";
import {  TouchableOpacity, StyleSheet, Text, View, TextInput, Image, Button} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Firebase from '../firebase';
import { showMessage } from "react-native-flash-message";
import { TouchableNativeFeedback } from "react-native-web";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [error,setError] = useState(true);
  const auth = getAuth(Firebase);

  useEffect(async()=>{
    await onAuthStateChanged(auth , (user)=>{
      if(user){
        // console.log(user);
        showMessage({
          message:'Already Logged In !',
          type:'success',
          icon:'success'
        })
        setEmail('');
        setPassword('');
        navigation.navigate("Welcome");
      }
    })


  })

  const handleSubmit = async () =>{

      if(email.length>5 && password.length>5){
        await signInWithEmailAndPassword(auth, email.toLowerCase(), password)
        .then((res)=>{
          // console.log(res);
          showMessage({
            message:'Log In Suceessfully!',
            type:'success',
            icon:'auto'
          })
        })
        .catch((err)=>{
          // console.log(err);
          showMessage({
            message:err.message,
            type:'danger',
            icon:'danger'
          })
        })
        setEmail('');
        setPassword('');
      }else{
        showMessage({
          message:'Enter Email/Password Correctly!',
          type:'warning',
          icon:'warning'
        })
      }   
  }


  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.backgrad}></View>
        <View style={styles.box}>
          <View style={styles.grad}>
            <View style={styles.imageBox}>
              <TouchableOpacity
              onPress={()=>console.log("done")}>
              <Image
                style={styles.images}
                source={require("../assets/login-1.png")}
              />
              </TouchableOpacity>
            </View>
            <Text style={styles.Headerfont}>Welcome Back</Text>
          </View>
          <View style={styles.flexing}>
            <Text style={styles.font}>Please Enter Username and Password</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={(text)=> setEmail(text)}
                value={email}
                // textContentType="email"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                value={password}
                keyboardType="visible-password"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>L O G I N</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("SignUp");
                  setEmail('');
                  setPassword('');
                }}
              >
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                // style={styles.button}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.buttonText}>FORGOT PASSWORD?</Text>
              </TouchableOpacity>               */}
            </View>
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
      height: 6
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    height: 180,
    backgroundColor: "#1f7882",
    borderTopRightRadius:18,
    borderTopLeftRadius:18
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
    height: 70,
    width: 70,
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
    height: 580,
    textAlign: "center",
    marginTop: 100,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    backgroundColor: "#F9F7F7",
    borderColor:'#1f7882',
    borderWidth:1.5
  },
  flexing: {
    height: 320,
    justifyContent: "space-evenly"
  },
  container: {
    backgroundColor: "#F9F7F7",
    height: "100%",
    width: "100%"
  },
  Headerfont: {
    marginBottom: 20,
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
    marginRight: 15
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
    borderRadius: 16
  },
  buttonText: {
    color: "#ffff",
    fontSize: 15,
    marginTop: 7,
    alignSelf:'center',
    paddingTop:5
  }
});

export default Login;