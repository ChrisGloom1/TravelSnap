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
      className='bg-white w-1/3' 
      style={{elevation: 2}} 
      onPress={() => handleOnImagePress(image)}
    >
      <ImageBackground
        source={{uri: image}}
        resizeMode='contain'
        className='aspect-square'
        
      >
        <Text></Text>
        </ ImageBackground>
    </TouchableOpacity>
  )
}

export default GalleryPost