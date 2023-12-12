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
      <View className="w-[175] h-[175] bg-gray-300 rounded-full items-center justify-center mb-4">
        <Text className="text-lg">No profile image</Text>
        <Text className="text-xs">Tap to add</Text>
      </View>
      </ImageBackground>
  </TouchableOpacity>
  )
}

export default SetupProfileImage