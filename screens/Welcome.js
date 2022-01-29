import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { Avatar, Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import * as Progress from 'react-native-progress';

const Welcome = ({ navigation }) => {
  const [limit, setLimit] = useState(0);
  const [currLimit, setCurrLimit] = useState(0);
  const [flow, setflow] = useState(0);
  const [user, setUser] = useState(null); 
  const [progress, setProgress] = useState(0); 
  const [time, setTime ] = useState(0);
  const auth = getAuth();

  useEffect(async () => {
    await onAuthStateChanged(auth, (user) => {

      if (user) {
        setUser(user);
        // console.log("user");
      } else {
        showMessage({
          message: "Please Login!",
          type: "warning",
          icon: "warning",
        });
        navigation.navigate("Login");
      }
    });

    await fetch(`https://api.thingspeak.com/channels/1639047/fields/1/last?api_key=6ZPC6OKP5E9ZKT38`)
    .then((res)=>{
      return res.json();
    }).then((data)=>{
      setCurrLimit(data);
      // console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })
    
    await fetch(`https://api.thingspeak.com/channels/1639047/fields/2/last?api_key=6ZPC6OKP5E9ZKT38`)
    .then((res)=>{
      return res.json();
    }).then((data)=>{
      setflow(data);
    })
    .catch((err)=>{
      console.log("err", err);
    })
  }, [limit]);

  const handleSet =async () =>{
    if(parseInt(limit)>0){
      const total = parseInt(limit*1000)/parseInt(flow);
      var time=0;
      const update=setInterval(()=>{
        time += 5;
        console.log(time/total);
        setProgress(time/total);
      }, 5000);
      await fetch(`https://api.thingspeak.com/update?api_key=LGO4G9ZJB3C4BVRE&field1=${limit}`)
      .then((res)=>{
        // console.log(res);
        return res.json();        
      }).then((data)=>{
        // console.log(data);
        showMessage({
          message: `Limit Set to ${limit}`,
          type: 'success',
          icon: 'success'
        })
      })
      .catch((err)=>{
        // console.log(err);
        showMessage({
          message: 'Failed to set Limit',
          type: 'danger',
          icon: 'danger'
        })
      })
      setLimit(0);
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
      .then((res) => {
        // console.log(res);
        showMessage({
          message: "Signed Out Sucessfully!",
          type: "success",
          icon: "success",
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
  };

  return (
    <KeyboardAwareScrollView style={tw`bg-blue-200`}>
      <View>
        <Appbar.Header style={tw`bg-blue-400 relative`}>
          <Appbar.Content title="Smart Water Saver"/>
          <TouchableOpacity onPress={()=>handleSignOut()}>
            <Avatar.Text
              size={50}
              label={auth && auth.currentUser.email[0].toUpperCase()}
              style={tw`bg-red-300`}
            />
          </TouchableOpacity>
        </Appbar.Header>
      </View>
      <Progress.Circle style={tw`flex mt-10 self-center`} size={150} progress={progress} showsText={true} />
      <View style={tw`m-5`}>
          <TextInput
            label="Water Limit in litre"
            mode="outlined"
            style={tw`mb-5 mx-10 rounded-lg	text-lg`}
            onChangeText={(text) => setLimit(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity style={tw`h-auto p-2 bg-blue-300 rounded-lg mx-8`} onPress={()=>handleSet()}>
            <Text style={tw`text-white font-semibold text-center text-lg pt-1`}>S E T</Text>
          </TouchableOpacity>
      </View>

      <View style={tw`mx-20 h-50 justify-center items-center border border-white bg-blue-100 rounded-2xl shadow-2xl`}>
        <Text style={tw`text-black m-2 text-xl `}>Water flow rate :</Text>
        <Text style={tw`text-black text-xl`}>{flow} ml/second</Text>
        <Text style={tw`text-black m-2 text-xl `}>Current Water Limit :</Text>
        <Text style={tw`text-black text-xl`}>{currLimit} Litre</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Welcome;
