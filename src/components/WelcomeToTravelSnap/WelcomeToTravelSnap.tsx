import { View, Text, Image } from "react-native"

const WelcomeToTravelSnap = () => {
  return (
    <View className="flex-1 justify-center items-center">
      {/* <Text className="m-2 font">Welcome to</Text>
      <Text className="text-5xl mb-4 font-bold">TravelSnap</Text> */}
      <Image 
        source={require('../../../assets/liggendelogo.png')}
        style={{ width: 300 }}
        resizeMode="contain"
      />
    </View>
  )
}

export default WelcomeToTravelSnap