import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'

type TGalleryPostProps = {
  userId: number
  userName: string
  image: string
  location: string
}

const handleOnImagePress = (image: string) => {
  // insert navigation logic here
  console.log(image)
}

const GalleryPost: React.FC<TGalleryPostProps> = ({ userName, image, location }) => {
  return (
    <TouchableOpacity 
      className='w-1/3 bg-transparent' 
      onPress={() => handleOnImagePress(image)}
    >
    <ImageBackground
      source={{uri: image}}
      resizeMode='contain'
      className='aspect-square' 
    />
    </TouchableOpacity>
  )
}

export default GalleryPost