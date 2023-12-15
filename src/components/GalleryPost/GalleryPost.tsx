import React from 'react'
import { TouchableOpacity, ImageBackground } from 'react-native'
import { Timestamp } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/RootNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type TGalleryPostProps = {
  postID: string
  username: string
  userImage: string
  image: string
  caption: string
  timestamp: Timestamp
  latitude: number
  longitude: number
  locationName: string
}

export type ProfilePageNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

  const GalleryPost: React.FC<TGalleryPostProps> = ({
    postID,
    username,
    userImage,
    image,
    caption,
    timestamp,
    latitude,
    longitude,
    locationName
  }) => {
  
    const navigation = useNavigation<ProfilePageNavigationProp>();
  
    const handleOnImagePress = (postID:string, username:string, userImage:string, image:string, caption:string, timestamp:Timestamp, latitude:number, longitude:number, locationName:string) => {  
      navigation.navigate("ImageDetail", {postID: postID, username: username, userImage: userImage, image: image, caption: caption, timestamp: timestamp, latitude: latitude, longitude: longitude, locationName: locationName})
    }
  
    return (
      <TouchableOpacity style={{width: '33.333333%'}} onPress={() => handleOnImagePress(postID, username, userImage, image, caption, timestamp, latitude, longitude, locationName)}>
      <ImageBackground
        source={{uri: image}}
        resizeMode='contain'
        style={{aspectRatio: 1}}
      />
      </TouchableOpacity>
    )
  }
  
  export default GalleryPost