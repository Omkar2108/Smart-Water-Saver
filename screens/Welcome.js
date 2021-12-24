import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

const Welcome = ({ navigation }) => {
  const [limit, setLimit] = useState(0);
  const [error, setError] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const auth = getAuth();

  useEffect(async ()=>{
      await onAuthStateChanged(auth, (user)=>{
          if(user){
              // console.log(user);
          }else{
              showMessage({
                  message:'Please Login!',
                  type:'warning',
                  icon:'warning'
                })
                navigation.navigate("Login");
          }
      })
    })

    const handleSignOut = async () =>{
      
      await signOut(auth)
      .then((res)=>{
          // console.log(res);
          showMessage({
            message:'Signed Out Sucessfully!',
            type:'success',
            icon:'success'
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
    }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor:"#CBFBE9"}}>
      <View style={styles.showHeader}>
        <Image style={styles.images} source={require("../assets/user.png")} />
        <Text style={styles.showHeaderfont}>{auth && auth.currentUser.email}</Text>
        <TouchableOpacity style={styles.logOut} onPress={()=>handleSignOut()}>
          <Text style={styles.showHeaderfont}>LogOut</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View style={styles.grad}>
          <Text style={styles.showFieldTitle}>Edit Water Limit</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="black"
            onChangeText={(text) => setLimit(text)}
            // textContentType="email"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>S E T</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
          <Text style={styles.showStatusText}>Water flow rate :</Text>
          <View style={styles.underline} />

        <View  style={styles.displayValues}>
            <Text style={styles.valueText}>50 ml/liter</Text>
        </View>
        <View style={styles.borderStyle} />
        <Text style={styles.showStatusText}>Water Turbidity :</Text>
          <View style={styles.underline} />

        <View  style={styles.displayValues}>
            <Text style={styles.valueText}>3 NTU</Text>
        </View>
        <View style={styles.borderStyle} />
          <Text style={styles.showStatusText}>Current Water Limit :</Text>
          <View style={styles.underline} />

        <View  style={styles.displayValues}>
            <Text style={styles.valueText}>20 LITERS</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  showHeader: {
    flexDirection: "row",
    height: 66,
    backgroundColor: "#1f7882",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.56,
    shadowRadius: 10
  },
  logOut: {
    marginTop: 16.5,
  },
  input: {
    shadowColor: "#000000",
    backgroundColor: "#dcdcdc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 9,
    height: 40,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 10,
    color: "black",
    borderColor: "#2f4f4f",
    borderWidth: 1
  },

  images: {
    height: 40,
    width: 40,
    alignSelf: "center",
    marginLeft: 15
  },
  box: {
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.56,
    shadowRadius: 13,
    height: "auto",
    textAlign: "center",
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,

  },
  showHeaderfont: {
    marginLeft: 40,
    marginBottom: 5,
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    fontSize: 20,
    color: "black"
  },
  showStatusText: {
    marginTop:20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: "black"
  },
  showFieldTitle: {
    marginTop:15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: "black"
  },
 
  button: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 9,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 20,
    elevation: 25,
    height: 40,
    backgroundColor: "#757575",
    borderColor: "#7fffd4",
    // padding: 12,
    borderRadius: 16
  },
  displayValues: {
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 20,
    height: 40,
    borderColor: "#7fffd4",
    // padding: 12,
    borderRadius: 16
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    marginTop: 5,
    alignSelf: "center",
    paddingTop: 5
  },
  valueText: {
    color: "black",
    fontSize: 20,
    marginTop: 7,
    alignSelf: "center",
    paddingTop: 5
  },
  borderStyle: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)', 
    borderBottomWidth: 4,
    marginTop: 2,
    marginBottom:2
  },
  underline: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)', 
    borderBottomWidth: 1,
    marginTop: 3,
    marginLeft:20,
    marginRight:20,
    marginBottom:3
  }
});

export default Welcome;





