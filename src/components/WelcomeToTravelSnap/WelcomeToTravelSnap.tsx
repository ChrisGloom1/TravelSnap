import { View, Text, Image } from "react-native"

const WelcomeToTravelSnap = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image 
        source={require('../../../assets/liggendelogo.png')}
        style={{ width: 300 }}
        resizeMode="contain"
      />
    </View>
  )
}

export default WelcomeToTravelSnap