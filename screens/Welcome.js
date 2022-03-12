import React, { useState, useEffect } from "react";
import { Animated, Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { Avatar, Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import { getDatabase, set, ref, onValue, update } from "firebase/database";
import  LiquidProgress  from 'react-native-liquid-progress';



const Welcome = ({ navigation }) => {
  const [limit, setLimit] = useState(0);
  const [currLimit, setCurrLimit] = useState(0);
  const [flow, setflow] = useState(0);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); 
  const auth = getAuth();
  const db = getDatabase();


  useEffect(async () => {
    await onAuthStateChanged(auth, (user) => {

      if (user) {
        setUser(user);
        // console.log(user);
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
    Newprogress();
    updateP();
  }, [limit]);

  async function updateP() {
    await fetch('https://api.thingspeak.com/channels/1639047/feeds.json?api_key=6ZPC6OKP5E9ZKT38&results=2')
        .then(response => response.json())
        .then(res =>{
          // console.log(res);
          var date, flow;
          for(let i of (res.feeds)){
            if(i.field2){
              flow = i.field2;
              date = i.created_at;
            }
          }
          set(ref(db, 'user/flow' ), {
            time: new Date(date).getTime(),
            flow
          });
        })
        .catch(err=>{
          console.log(err);
        })

  }

  async function Newprogress() {
    const val = ref(db, 'user/');
    onValue(val, (snapshot) => {
      if(snapshot.val().flow.time > snapshot.val().limit.time){
        // console.log((new Date().getTime() - snapshot.val().flow.time)/1000);
        const total =(new Date().getTime() - snapshot.val().flow.time)/1000 /(snapshot.val().limit.limit * 1000 / snapshot.val().flow.flow) ;
        // console.log(total);
        setProgress(total <= 1 ? total: 1);
      }
  })
}


  const handleSet =async () =>{
    if(parseInt(limit)>0){
      console.log(limit);
      await fetch(`https://api.thingspeak.com/update?api_key=LGO4G9ZJB3C4BVRE&field1=${limit}`)
      .then((res)=>{
        // console.log(res);
        return res.json();        
      }).then((data)=>{
        // console.log(data);
        set(ref(db, 'user/limit' ), {
          limit: parseInt(limit),
          time:new Date().getTime(),
        });
        showMessage({
          message: `Limit Set to ${limit}`,
          type: 'success',
          icon: 'success'
        })
      })
      .catch((err)=>{
        console.log(err);
        showMessage({
          message: 'Failed to set Limit',
          type: 'danger',
          icon: 'danger'
        })
      })
      setLimit('');
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
      
      <View style={tw``}>
        <LiquidProgress
          backgroundColor={"white"}
          frontWaveColor={"#1ca3ec"}
          backWaveColor={"skyblue"}
          fill={progress}
          size={200}
        >
          <Animated.View style={tw`flex-row self-center`}>
            <Text style={tw`text-2xl`}>{(progress * 100).toFixed(2)}%</Text>
          </Animated.View>
        </LiquidProgress>
          <TextInput
            label="Water Limit in litre"
            maxLength={4}
            mode="outlined"
            style={tw`mt-10 mb-5 mx-10 rounded-lg	text-lg`}
            onChangeText={(text) => setLimit(text)}
            keyboardType="numeric"
            value={limit.toString()}
          />

          <TouchableOpacity style={tw`h-auto p-2 bg-blue-300 rounded-lg mx-8`} onPress={()=>handleSet()}>
            <Text style={tw`text-white font-semibold text-center text-lg pt-1`}>S E T</Text>
          </TouchableOpacity>
      </View>

      <View style={tw`mx-15 justify-center items-center border border-white bg-blue-100 rounded-2xl shadow-2xl mt-10`}>
        <Text style={tw`text-black m-2 text-xl mt-1`}>Water flow rate :</Text>
        <Text style={tw`text-black text-xl`}>{flow} ml/second</Text>
        <Text style={tw`text-black m-2 text-xl `}>Current Water Limit :</Text>
        <Text style={tw`text-black text-xl`}>{currLimit} Litre</Text>
        <Text style={tw`text-black m-2 text-xl `}>Current Container water:</Text>
        <Text style={tw`text-black text-xl`}>{(progress * currLimit).toFixed(2)} Litre</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Welcome;
