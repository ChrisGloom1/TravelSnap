import { ImageBackground, View } from "react-native"
import { TouchableOpacity, Text } from "react-native"

type TSetupProfileImageProps = {
  onPress: () => void;
  image: string;
}

const SetupProfileImage: React.FC<TSetupProfileImageProps> = ({onPress}, {image}) => {

  return(
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={image} resizeMode="cover">
      <View style={{width: 175, height: 175, backgroundColor: 'lightgray', borderRadius: 175/2, alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
        <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 8}}>Profile image?</Text>
        <Text style={{fontSize: 12}}>Tap to add</Text>
      </View>
      </ImageBackground>
  </TouchableOpacity>
  )
}

export default SetupProfileImage