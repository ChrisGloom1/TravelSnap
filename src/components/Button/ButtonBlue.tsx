import { GestureResponderEvent, TouchableOpacity, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type TButtonProps = {
  label: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
  disabled?: boolean | undefined
}

const ButtonBlue: React.FC<TButtonProps> = ({ label, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient 
        style={{backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 32, paddingVertical: 14, margin: 10}}
        colors={['#a0cbff', '#a0b9ff']}
      >
        <Text>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonBlue