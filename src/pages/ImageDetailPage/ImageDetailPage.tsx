import { View, Text, Image, ScrollView } from "react-native"
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient"
import Icon from 'react-native-vector-icons/Feather'
import { Timestamp } from "firebase/firestore"
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../components/Navigation/RootNavigator"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { TabStackParamList } from "../../components/Navigation/TabNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location";


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

export type ProfilePageNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type ImageDetailScreenRouteProp = RouteProp<RootStackParamList, "ImageDetail">;

const ImageDetailPage = ({}) => {

  const [cityName, setCityName] = useState<string>("");

  const {params: {postID, username, userImage, image, caption, timestamp, latitude, longitude, locationName}} = useRoute<ImageDetailScreenRouteProp>();

  useEffect(() => {
    console.log(locationName)
    findLocationName(latitude, longitude);
  }, [locationName])

  const findLocationName = async (lat: number, long: number) => {
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      setCityName(reverseGeocode[0]?.city || "Unknown Location");
    }
  };
  return (
    <LinearGradient 
    // className="flex-1 mt-14" 
    style={{flex: 1, marginTop: 56}}
    colors={['#ffc0a066', '#ffe7a066']}
    >
      <View 
      // className="py-2 flex-row items-center"
      style={{paddingVertical: 8, flexDirection: 'row', alignItems: 'center'}}
       >
        <Image 
          source={{ uri: userImage }}
          // className="w-[25] h-[25] rounded-full ml-2"
          style={{width: 25, height: 25, borderRadius: 12.5, marginLeft: 8}}
        />
        <Text 
        // className="ml-1 self-center font-bold"
        style={{marginLeft: 8, alignSelf: 'center', fontWeight: 'bold'}}
        >{username}</Text>
      </View>
      <Image 
        source={{ uri: image }}
        // className="w-full aspect-square"
        style={{width: '100%', aspectRatio: 1}}
      />

      <View 
      // className="flex flex-row items-center p-2"
      style={{flexDirection: 'row', alignItems: 'center', padding: 8}}
      >
        <Icon 
          name="map-pin"
          size={20}
        />
        <View 
        // className="flex-1 flex-row justify-between"
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
        >
          <Text 
          // className="ml-1 text-md"
          style={{marginLeft: 8, fontSize: 16}}
          >Klodzko</Text>
          <Text 
          // className="text-gray-700"
          style={{color: 'gray'}}
          >22.11.23</Text>
        </View>
      </View>

    </LinearGradient>
  )
}

export default ImageDetailPage