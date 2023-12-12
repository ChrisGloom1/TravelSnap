import { View, Text, Image } from "react-native"
import React from 'react'
import { LinearGradient } from "expo-linear-gradient"
import Icon from 'react-native-vector-icons/Feather'

type TImageDetailPageProps = {
  imageId: number
  image: string
  coords: string
  timestamp: string
  userId: number
  userName: string
  userImage: string
}

const IMAGEDETAILDATA: TImageDetailPageProps = {
  imageId: 1,
  image: "https://g4.img-dpreview.com/E1B05DB942FF4CB4B6A84AC45DE108A0.jpg",
  coords: "New York, NY",
  timestamp: "2021-10-10 10:10:10",
  userId: 1,
  userName: "John Doe",
  userImage: "https://www.w3schools.com/howto/img_avatar.png"
}

const ImageDetailPage:React.FC<TImageDetailPageProps> = ({ imageId, image, userId, userImage, coords, timestamp }) => {
  return (
    <LinearGradient className="flex-1 mt-14" colors={['#ffc0a066', '#ffe7a066']}>
      <View className="py-2 flex-row items-center" >
        <Image 
          source={{ uri: IMAGEDETAILDATA.userImage }}
          className="w-[25] h-[25] rounded-full ml-2"
        />
        <Text className="ml-1 self-center font-bold">{IMAGEDETAILDATA.userName}</Text>
      </View>
      <Image 
        source={{ uri: IMAGEDETAILDATA.image }}
        className="w-full aspect-square"
      />

      <View className="flex flex-row items-center p-2">
        <Icon 
          name="map-pin"
          size={20}
        />
        <View className="flex-1 flex-row justify-between">
          <Text className="ml-1 text-md">Klodzko</Text>
          <Text className="text-gray-700">22.11.23</Text>
        </View>
      </View>

    </LinearGradient>
  )
}

export default ImageDetailPage