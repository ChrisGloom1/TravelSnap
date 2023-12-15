import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { createMaterialTopTabNavigator, MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import TabPosts from "../../components/TabPosts/TabPosts";

export type TopTabStackParamList = {
  New: {tabName: string};
  Near: {tabName: string};
  Search: {tabName: string};
}

export type ExplorePageNavigationProp = MaterialTopTabNavigationProp<TopTabStackParamList>;

const ExplorePage = () => {

  const Tab = createMaterialTopTabNavigator<TopTabStackParamList>();
  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
       (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
          setCountryName(reverseGeocode[0]?.country || "Unknown Location");
        }
        })();
  }, [countryName])
 

  const NewPosts = () => {
    return (
      <TabPosts tabName={"New"} countryName={countryName}/>
    )
  }

  const NearbyPosts = () => {
    return (
      <TabPosts tabName={"Nearby"} countryName={countryName}/>
    )
  }

  const SearchedPosts = () => {
    return (
      <TabPosts tabName="Search" countryName={countryName}/>
    )
  }


  return (

      <Tab.Navigator>
        <Tab.Screen name="New" component={NewPosts}/>

        <Tab.Screen name="Near" component={NearbyPosts}/>
     
        <Tab.Screen name="Search" component={SearchedPosts}/>
      </Tab.Navigator>
  )
};

export default ExplorePage;
