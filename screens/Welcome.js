import React, { useState, useEffect } from "react";
import { Animated, Text, View, TouchableOpacity, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { Avatar, Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import { getDatabase, set, ref, onValue, update } from "firebase/database";
import LiquidProgress from "react-native-liquid-progress";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const Welcome = ({ navigation }) => {
  const [limit, setLimit] = useState("");
  const [currLimit, setCurrLimit] = useState(0);
  const [flow, setflow] = useState(0);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const auth = getAuth();
  const db = getDatabase();
  const refreshInterval = 10000;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const updateComponent = async () => {
    await onAuthStateChanged(auth, (user) => {
      Newprogress();
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

    await fetch(
      `https://api.thingspeak.com/channels/1639047/fields/1/last?api_key=6ZPC6OKP5E9ZKT38`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrLimit(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch(
      `https://api.thingspeak.com/channels/1639047/fields/2/last?api_key=6ZPC6OKP5E9ZKT38`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setflow(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(async () => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(updateComponent, 10000);
      return () => clearInterval(interval);
    }
  }, [limit, refreshInterval]);

  async function Newprogress() {
    await fetch(
      "https://api.thingspeak.com/channels/1639047/feeds.json?api_key=6ZPC6OKP5E9ZKT38&results=10"
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        var flowdate, flow, limit, limitdate;
        for (let i of res.feeds.reverse()) {
          if (i.field2 && i.created_at) {
            flow = i.field2;
            flowdate = i.created_at;
            break;
          }
        }
        for (let i of res.feeds.reverse()) {
          if (i.field1 && i.created_at) {
            limit = i.field1;
            limitdate = i.created_at;
            break;
          }
        }
        set(
          ref(db, "user/flow"),
          {
            time: new Date(flowdate).getTime(),
            flow,
          },
          ref(db, "user/limit"),
          {
            time: new Date(limitdate).getTime(),
            limit,
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });

    const val = ref(db, "user/");
    onValue(val, (snapshot) => {
      if (snapshot.val().flow.time > snapshot.val().limit.time) {
        // console.log((new Date().getTime() - snapshot.val().flow.time)/1000);
        const total =
          (new Date().getTime() - snapshot.val().flow.time) /
          1000 /
          ((snapshot.val().limit.limit * 1000) / snapshot.val().flow.flow);
        // console.log(total);
        setProgress(total <= 1 ? total : 1);
      }
    });
  }

  const handleSet = async () => {
    if (parseInt(limit) > 0) {
      console.log(limit);
      await fetch(
        `https://api.thingspeak.com/update?api_key=LGO4G9ZJB3C4BVRE&field1=${limit}`
      )
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          set(ref(db, "user/limit"), {
            limit: parseInt(limit),
            time: new Date().getTime(),
          });
          showMessage({
            message: `Limit Set to ${limit}`,
            type: "success",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          showMessage({
            message: "Failed to set Limit",
            type: "danger",
            icon: "danger",
          });
        });
      setLimit("");
    }else{
      showMessage({
        message: "Enter the correct value!",
        type: "danger",
        icon: "danger",
      });
    }
  };

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

  const onChange1 = (_, selectedDate) => {
    setStartDate(selectedDate);
    set(
      ref(db, "user/startTime"),
      {
        startTime: selectedDate.toString(),
      }
    )
  };
  const onChange2 = (_, selectedDate) => {
    setEndDate(selectedDate);
    set(
      ref(db, "user/endTime"),
      {
        endTime : selectedDate.toString(),
      }
    )
  };
  const showMode = (time) => {
    DateTimePickerAndroid.open({
      value: time === "start" ? startDate : endDate,
      onChange: time === "start" ? onChange1 : onChange2,
      mode: "time",
    });
  };

  const convert24to12 = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join("");
  };

  return (
    <KeyboardAwareScrollView style={tw`bg-blue-200`}>
      <Appbar.Header style={tw`bg-blue-400 relative`}>
        <Appbar.Content title="Smart Water Saver" />
        <TouchableOpacity onPress={() => handleSignOut()}>
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
          <Animated.View style={tw`flex-row `}>
            <Text style={tw`text-xl `}>{(progress * 100).toFixed(2)}%</Text>
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

        <TouchableOpacity
          style={tw`h-auto p-2 bg-blue-300 rounded-lg mx-8`}
          onPress={() => handleSet()}
        >
          <Text style={tw`text-white font-semibold text-center text-lg pt-1`}>
            S E T
          </Text>
        </TouchableOpacity>

        <Text style={tw`mt-5 text-black text-xl text-center`}>
          Select Time Slot:
        </Text>

        <View style={tw`mt-2 mx-10 mb-5 flex flex-row justify-center`}>
          <TouchableOpacity
            style={tw`bg-gray-500 w-auto text-white p-1 rounded text-sm w-auto float-left`}
            onPress={() => showMode("start")}
          >
            <Text style={tw`text-white font-semibold text-center text-lg pt-1`}>
              Start Time : {convert24to12(startDate.toLocaleTimeString())}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`ml-5 bg-gray-500 w-auto text-white p-1 rounded text-sm w-auto float-right`}
            onPress={() => showMode("end")}
          >
            <Text style={tw`text-white font-semibold text-center text-lg pt-1`}>
              End Time : {convert24to12(endDate.toLocaleTimeString())}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={tw`mx-10 justify-center items-center border border-white bg-blue-100 rounded-2xl shadow-2xl mt-10 mt-5`}
      >
        <Text style={tw`text-black m-2 text-xl mt-1`}>Water flow rate :</Text>
        <Text style={tw`text-black text-xl`}>{flow} ml/second</Text>
        <Text style={tw`text-black m-2 text-xl `}>Current Water Limit :</Text>
        <Text style={tw`text-black text-xl`}>{currLimit} Litre</Text>
        <Text style={tw`text-black m-2 text-xl `}>
          Current Container water:
        </Text>
        <Text style={tw`text-black text-xl`}>
          {(progress * currLimit).toFixed(2)} Litre
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Welcome;
