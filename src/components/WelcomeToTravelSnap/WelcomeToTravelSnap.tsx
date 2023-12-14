import { View, Text, Image } from "react-native"

const WelcomeToTravelSnap = () => {
  return (
    <View 
      // className="flex-1 justify-center items-center"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Image 
        source={require('../../../assets/liggendelogo.png')}
        style={{ width: 300, height: 50, marginBottom: 64 }}
        resizeMode="contain"
      />
    </View>
  )
}

export default WelcomeToTravelSnap