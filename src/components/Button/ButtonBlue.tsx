import { GestureResponderEvent, TouchableOpacity, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type TButtonProps = {
  label: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const ButtonBlue: React.FC<TButtonProps> = ({ label, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient 
        className="bg-white rounded-xl px-6 py-3 mx-4"
        style={{elevation: 2}}
        colors={['#a0cbff', '#a0b9ff']}
      >
        <Text>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonBlue