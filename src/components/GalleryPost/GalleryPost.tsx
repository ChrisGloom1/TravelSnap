import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Timestamp } from 'firebase/firestore'

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

const handleOnImagePress = (postID:string, username:string, userImage:string, image:string, caption:string, timestamp: Timestamp, latitude:number, longitude:number, locationName:string) => {
  // insert navigation logic here
  
}

// const POST: TGalleryPostProps = {
//   postId: '1',
//   username: 'John Doe',
//   userImage: "https://www.w3schools.com/howto/img_avatar.png",
//   image: "https://g4.img-dpreview.com/E1B05DB942FF4CB4B6A84AC45DE108A0.jpg",
//   caption: "Meget kule ting å si her om bildet som er så tøft og fint og kult osv. Elsker at bildet er firkanta, men jeg må bare skrive masse for å se hvordan teksten blir seende ut.",
//   timestamp: "December 13, 2023 at 12:44:08 AM UTC+1",
//   latitude: 50.39010383987494,
//   longitude: 16.625432466983604,
//   locationName: "Oslo, Norway"
// }

const GalleryPost: React.FC<TGalleryPostProps> = ({
  postID,
  username,
  userImage,
  image,
  caption,
  timestamp,
  latitude,
  longitude,
  locationName,
}) => {
  return (
    <TouchableOpacity 
      // className='w-1/3'
      style={{width: '33.333%'}} 
      onPress={() => handleOnImagePress(postID, username, userImage, image, caption, timestamp, latitude, longitude, locationName)}
    >
    <ImageBackground
      source={{uri: image}}
      resizeMode='contain'
      // className='aspect-square' 
      style={{aspectRatio: 1}}
    />
    </TouchableOpacity>
  )
}

export default GalleryPost