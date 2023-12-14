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
    <ScrollView>
      <LinearGradient className="flex-1" colors={['#ffc0a066', '#ffe7a066']}>
        <View className="py-2 flex-row items-center" >
          <Image 
            source={{ uri: userImage }}
            className="w-[30] h-[30] rounded-full ml-2"
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
          <View className="flex-1 flex-row justify-between items-center">
            <Text className="ml-1 text-md font-bold">{cityName ? cityName : "Unknown location"}</Text>
            <Text className="text-gray-700">{timestamp.toString()}</Text>
          </View>
        </View>
        <View className="m-2">
          <View>
            <MapView
              style={{ height: 200, margin: 4, borderStyle: "solid", borderColor: "black", borderWidth: 1 }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              {latitude && longitude && (
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  title="Photo location"
                  identifier="Photo location"
                />
              )}
            </MapView>
          </View>

          <Text className="font-bold">{username}
            <Text className="font-normal"> {caption}</Text>
          </Text>
          
        </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default ImageDetailPage