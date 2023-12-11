import { GestureResponderEvent, TouchableOpacity, View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type TButtonProps = {
  label: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const ButtonBlue: React.FC<TButtonProps> = ({ label, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient 
        className="bg-blue-200 rounded-xl px-8 py-4 m-4"
        colors={['#a0cbff', '#a0b9ff']}
      >
        <Text>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonBlue