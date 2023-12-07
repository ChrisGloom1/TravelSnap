import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ButtonBlue from "../../components/Button/ButtonBlue"
import Input from "../../components/Input/Input"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"


const LoginPage = () => {

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const handleEmailChange = (text: string) => {
    setEmailValue(text)
  }
  const handlePasswordChange = (text: string) => {
    setPasswordValue(text)
  }

  const handleLoginPress = () => {
    // insert login logic here
    console.log("user: " + emailValue + " pass: " + passwordValue)
  }

  const goToRegisterPage = () => {
    // insert navigation logic here
    console.log("go to register page")
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
    </View>
  )
}

export default LoginPage