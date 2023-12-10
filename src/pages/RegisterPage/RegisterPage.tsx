import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ButtonBlue from "../../components/Button/ButtonBlue"
import Input from "../../components/Input/Input"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"
import { auth, db } from "../../../firebase";
import { addDoc, collection, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigation/RootNavigator";

export type RegisterScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "Home">,
NativeStackNavigationProp<RootStackParamList>
>;

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
          const docRef = await addDoc(collection(db, 'users'), {
            userID: user.uid,
            username: usernameValue
          });  
          console.log("New user added with id: ", docRef.id)
          navigation.navigate('Main');
        })
        .catch(error => alert(error.message))
  }

  const goToLoginPage = () => {
    navigation.navigate('Login');
    console.log("go to login page");
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className=" w-[90%] h-[85%] items-center justify-center mt-9">
        <WelcomeToTravelSnap />
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
    </View>
  )
}

export default RegisterPage;