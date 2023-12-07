import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import ButtonBlue from "../../components/Button/ButtonBlue"
import Input from "../../components/Input/Input"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"


const RegisterPage = () => {

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')

  const handleEmailChange = (text: string) => {
    setEmailValue(text)
  }
  const handlePasswordChange = (text: string) => {
    setPasswordValue(text)
  }
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPasswordValue(text)
  }

  const handleLoginPress = () => {
    // insert login logic here
    console.log("user: " + emailValue + " \npass: " + passwordValue + " \nconfirm pass: " + confirmPasswordValue)
  }

  const goToLoginPage = () => {
    // insert navigation logic here
    console.log("go to login page")
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
            onPress={handleLoginPress}
          />
        </View>
      </View>
    </View>
  )
}

export default RegisterPage