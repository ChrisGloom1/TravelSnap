import { GestureResponderEvent, TouchableOpacity, View, Text } from "react-native"

type TButtonProps = {
  label: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const ButtonBlue: React.FC<TButtonProps> = ({ label, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-blue-200 rounded-xl px-8 py-4 m-4">
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ButtonBlue