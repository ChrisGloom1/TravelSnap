import { View, Text, Image } from "react-native"
import React from 'react'
import { LinearGradient } from "expo-linear-gradient"
import Icon from 'react-native-vector-icons/Feather'
import { Timestamp } from "firebase/firestore"
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../components/Navigation/RootNavigator"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { TabStackParamList } from "../../components/Navigation/TabNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type TImageDetailPageProps = {
  postID: string,
  username: string;
  userImage: string;
  image: string;
  caption: string;
  timestamp: Timestamp;
  latitude: number;
  longitude: number;
  locationName: string
}

// type ImageDetailScreenRouteProp = RouteProp<RootStackParamList, "ImageDetail">;

// export type ImageDetailScreenNavigationProp = CompositeNavigationProp<
// BottomTabNavigationProp<TabStackParamList, "Details">,
// NativeStackNavigationProp<RootStackParamList>
// >

const ImageDetailPage = ({}) => {

  // const navigation = useNavigation<ImageDetailScreenNavigationProp>();
  // const {params: {postID: string} , username, userImage, image, caption, timestamp, latitude, longitude, locationName}} = useRoute<ImageDetailScreenRouteProp>();
  

  return (
    <LinearGradient className="flex-1 mt-14" colors={['#ffc0a066', '#ffe7a066']}>
      <View className="py-2 flex-row items-center" >
        <Image 
          source={{ uri: userImage }}
          className="w-[25] h-[25] rounded-full ml-2"
        />
        <Text className="ml-1 self-center font-bold">{username}</Text>
      </View>
      <Image 
        source={{ uri: image }}
        className="w-full aspect-square"
      />

      <View className="flex flex-row items-center p-2">
        <Icon 
          name="map-pin"
          size={20}
        />
        <View className="flex-1 flex-row justify-between">
          <Text className="ml-1 text-md">{locationName}</Text>
          <Text className="text-gray-700">{}</Text>
        </View>
      </View>

    </LinearGradient>
  )
}

export default ImageDetailPage