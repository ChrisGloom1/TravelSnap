import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import Input from "../../components/Input/Input"
import ButtonBlue from "../../components/Button/ButtonBlue"
import SetupProfileImage from "../../components/SetupProfileImage/SetupProfileImage"
import WelcomeToTravelSnap from "../../components/WelcomeToTravelSnap/WelcomeToTravelSnap"


const ProfileSetupPage = () => {

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')

  const handleUsernameChange = (text: string) => {
    console.log(text)
  }
  const handleBioChange = (text: string) => {
    console.log(text)
  }

  const handleLoginPress = () => {
    // insert login logic here
    console.log("user: " + emailValue + " \npass: " + passwordValue + " \nconfirm pass: " + confirmPasswordValue)
  }

  const addProfileImage = () => {
    // insert navigation to CameraComponent here
    console.log("Profile image tapped")
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className=" w-[90%] h-[85%] items-center justify-center pt-9">

        <WelcomeToTravelSnap />
        <SetupProfileImage
          onPress={addProfileImage}
        />
        <Input placeholderText="Username" onInputChange={handleUsernameChange} />
        <Input placeholderText="Bio" onInputChange={handleBioChange} />
        <View className="flex-1 items-center">
          <ButtonBlue 
            label="Continue"
            onPress={handleLoginPress}
          />
        </View>
      </View>
    </View>
  )
}

export default ProfileSetupPage