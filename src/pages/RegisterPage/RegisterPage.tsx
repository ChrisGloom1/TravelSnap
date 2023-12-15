import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import ButtonBlue from "../../components/Button/ButtonBlue"
import Input from "../../components/Input/Input"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"
import { LinearGradient } from "expo-linear-gradient"
import { auth, db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
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
          const userDocRef = doc(db, 'users', user.uid);
    
          await setDoc(userDocRef, {
            userID: user.uid,
            username: usernameValue,
            profileImg: null
          })
          navigation.navigate("ProfileSetupPage");
        })
        .catch(error => alert(error.message))
  }

  const goToLoginPage = () => {
    navigation.navigate('Login');
  }

  return (
    <LinearGradient style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} colors={['#ffc0a0', '#ffe7a0']}>
      <View style={{width: '90%', height: '85%', alignItems: 'center', justifyContent: 'center', marginTop: 36}}>
        <WelcomeToTravelSnap />
        <Text>Register</Text>
        <Input placeholderText="Email" onInputChange={handleEmailChange}/>
        <Input placeholderText="Username" onInputChange={handleUsernameChange}/>
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

        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={goToLoginPage}>
            <Text style={{padding: 4, color: 'gray', fontWeight: 'bold'}}>Already have a user? Click here to log in</Text>
          </TouchableOpacity>
          <ButtonBlue label="Register" onPress={handleRegisterPress}/>
        </View>
      </View>
    </LinearGradient>
  )
}

export default RegisterPage;