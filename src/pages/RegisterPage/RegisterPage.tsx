import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ButtonBlue from "../../components/Button/ButtonBlue"
import Input from "../../components/Input/Input"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"
import { LinearGradient } from "expo-linear-gradient"
import { auth, db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigation/RootNavigator";

export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterPage = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [emailValue, setEmailValue] = useState<string>('')
  const [usernameValue, setUsernameValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')

  const handleEmailChange = (text: string) => {
    setEmailValue(text)
  }
  const handleUsernameChange = (text: string) => {
    setUsernameValue(text)
  }
  const handlePasswordChange = (text: string) => {
    setPasswordValue(text)
  }
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPasswordValue(text)
  }

  const handleRegisterPress = async () => {
    createUserWithEmailAndPassword(auth, emailValue.trim(), passwordValue)
      .then(async userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with: ', user.email + 'password: ', passwordValue + " \nconfirm pass: " + confirmPasswordValue);
          const userDocRef = doc(db, 'users', user.uid);
    
          await setDoc(userDocRef, {
            userID: user.uid,
            username: usernameValue,
            profileImg: null
          })
          console.log("New user added with id: ", userDocRef.id)
          navigation.navigate("ProfileSetupPage");
        })
        .catch(error => alert(error.message))
  }

  const goToLoginPage = () => {
    navigation.navigate('Login');
    console.log("go to login page");
  }

  return (
    <LinearGradient 
    className="flex-1 items-center justify-center bg-gray-100"
    colors={['#ffc0a0', '#ffe7a0']}
  >
      <View className=" w-[90%] h-[85%] items-center justify-center mt-9">
        <WelcomeToTravelSnap />
        <Text>Register</Text>
        <Input 
          placeholderText="Email" 
          onInputChange={handleEmailChange}
        />
        <Input 
          placeholderText="Username" 
          onInputChange={handleUsernameChange}
        />
        <Input 
          placeholderText="Password" 
          onInputChange={handlePasswordChange}
          secureTextEntry={true}
        />
        <Input 
          placeholderText="Confirm password" 
          onInputChange={handleConfirmPasswordChange}
          secureTextEntry={true}
        />

        <View className="flex-1 items-center">
          <TouchableOpacity onPress={goToLoginPage}>
            <Text className="p-4 text-gray-700 font-bold">Already have a user? Click here to log in</Text>
          </TouchableOpacity>
          <ButtonBlue 
            label="Register"
            onPress={handleRegisterPress}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

export default RegisterPage;