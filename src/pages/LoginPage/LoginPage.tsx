import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonBlue from "../../components/Button/ButtonBlue";
import Input from "../../components/Input/Input";
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"
import { LinearGradient } from "expo-linear-gradient"
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { RootStackParamList } from "../../components/Navigation/RootNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type LoginScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "Home">,
NativeStackNavigationProp<RootStackParamList>
>;

const LoginPage = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const handleEmailChange = (text: string) => {
    setEmailValue(text)
  }
  const handlePasswordChange = (text: string) => {
    setPasswordValue(text)
  }

  const handleLoginPress = () => {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Logged in with ', user.email + "and pass: ", passwordValue)
            navigation.navigate('Main');
        })
        .catch(error => alert(error.message));
  }

  const goToRegisterPage = () => {
    navigation.navigate('Register');
    console.log("go to register page");
  }

  return (
    <LinearGradient 
      className="flex-1 items-center justify-center bg-gray-100"
      colors={['#ffc0a0', '#ffe7a0']}
    >
      <View className=" w-[90%] h-[85%] items-center justify-center mt-9">
        <WelcomeToTravelSnap />
        <Text>Log in</Text>
        <Input 
          placeholderText="Email" 
          onInputChange={handleEmailChange}
        />

        <Input 
          placeholderText="Password" 
          onInputChange={handlePasswordChange}
          secureTextEntry={true}
        />

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={goToRegisterPage}>
            <Text className="p-4 text-gray-700 font-bold">No user? Click here to create a user</Text>
          </TouchableOpacity>
          <ButtonBlue 
            label="Log in"
            onPress={handleLoginPress}
          />
        </View>
      </View>
    </LinearGradient>

  )
}

export default LoginPage;