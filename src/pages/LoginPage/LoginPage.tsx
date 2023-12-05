import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"


const LoginPage = () => {

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const handleEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmailValue(e.nativeEvent.text)
  }
  const handlePasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPasswordValue(e.nativeEvent.text)
  }

  const handleLoginPress = () => {
    // insert login logic here
    console.log("user: " + emailValue + " pass: " + passwordValue)
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className=" w-[90%] h-[85%] rounded-lg items-center justify-center pt-9">
        <Text className="m-3 font">Welcome to</Text>
        <Text className="text-5xl mb-9 font-bold">TravelSnap</Text>
        <TextInput className="bg-white rounded-lg w-[90%] p-4 m-2" placeholder="Email" value={emailValue} onChange={handleEmailChange} />
        <TextInput className="bg-white rounded-lg w-[90%] p-4 m-2" placeholder="Password" value={passwordValue} onChange={handlePasswordChange} secureTextEntry={true} />
        <View className="flex-1 w-[90%] space-x-4 items-center">
          <TouchableOpacity>
            <Text className="p-4 text-gray-700 font-bold">No user? Click here to create a user</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text className="bg-blue-200 rounded-lg p-4 m-4">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginPage