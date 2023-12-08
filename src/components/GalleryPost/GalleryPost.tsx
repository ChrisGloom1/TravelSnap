import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'

type TGalleryPostProps = {
  userId: number
  userName: string
  image: string
  location: string
}


const GalleryPost: React.FC<TGalleryPostProps> = ({ userName, image, location }) => {
  return (
    <View className='bg-gray-200 h-[170] m-1 rounded-md'>
      <View>
        <Text className="text-xs font-bold p-1">{userName}</Text>
        <Image
          source={{uri: image}}
          resizeMode='cover'
          className='h-[120] w-[120]'
        />
      </View>
      <Text className='text-xs font-light p-1 text-clip'>{location}</Text>
    </View>
  )
}

export default GalleryPost