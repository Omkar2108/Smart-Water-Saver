import { View , Text, Button } from 'react-native';
import React from 'react';

function HomeScreen({ navigation }) {
    return (
        <View style={{padding:10, margin:10}}>
            <Text> This is HomeScreen !</Text>
            <Button  title="Login" onPress={()=>  navigation.navigate("Login")}></Button>
            <Button  title="Sign Up"  onPress={()=>  navigation.navigate("SignUp")}></Button>
        </View>
    )
}

export default HomeScreen;
