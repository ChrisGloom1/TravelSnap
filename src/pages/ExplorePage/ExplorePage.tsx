import { View, Text, Button, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, onSnapshot, or, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import FeedPost, { FeedPostProps } from '../../components/FeedPost/FeedPost';
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ExplorePage = () => {
  const [posts, setPosts] = useState<FeedPostProps[]>([]);
  const [username, setUsername] = useState<string>("no username");
  const [profileImg, setProfileImg] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [postLocation, setPostLocation] = useState<Location.LocationObject>(); 
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPostLocation(location);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        setLocationName(reverseGeocode[0]?.country || "Unknown Location");
      
      
      
      }
    })();
  }, [locationName]);

  const fetchPostsDescending = () => {
    const unsubscribePosts = onSnapshot(
      query(
        collection(db, 'posts'), //(db, `posts/${userId}/userPosts`)
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            findLocationName(data.coords.latitude, data.coords.longitude);
            fetchUserInfo(data.userID)
            return {
              postID: doc.id,
              username: username,
              userImage: profileImg,
              image: data.image,
              caption: data.caption,
              timestamp: data.timestamp,
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
              locationName: locationName,
            };
          })
        );
      }
    );
    unsubscribePosts();
  }

  const fetchPostsByCountry = (country: string) => {
    const unsubscribePosts = onSnapshot(
      query(
        collection(db, 'posts'), //(db, `posts/${userId}/userPosts`)
        where("country", "==", country),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            findLocationName(data.coords.latitude, data.coords.longitude);
            fetchUserInfo(data.userID)
            return {
              postID: doc.id,
              username: username,
              userImage: profileImg,
              image: data.image,
              caption: data.caption,
              timestamp: data.timestamp,
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
              locationName: locationName,
            };
          })
        );
      }
    );
    unsubscribePosts()
  }

  const searchPostsByKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    const firstLetter = trimmedKeyword.charAt(0).toUpperCase();
    const slicedKeyword = trimmedKeyword.slice(1);
    const preparedKeyword = firstLetter + slicedKeyword;
    console.log("Prepared keyword: " + preparedKeyword);

    const unsubscribePosts = onSnapshot(
      query(
        collection(db, 'posts'), //(db, `posts/${userId}/userPosts`)
        or(where("caption", "==", keyword),
        where("city", "==", keyword),
        where("country", "==", keyword)),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            findLocationName(data.coords.latitude, data.coords.longitude);
            console.log("LOCATION FROM EXPLOREPAGE USEEFFECT: " + locationName);
            fetchUserInfo(data.userID)
            return {
              postID: doc.id,
              username: username,
              userImage: profileImg,
              image: data.image,
              caption: data.caption,
              timestamp: data.timestamp,
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
              locationName: locationName,
            };
          })
        );
      }
    );


    return () => {
      console.log("Cleaning up...");
      unsubscribePosts();
    };
  }

  const findLocationName = async (lat: number, long: number) => {
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      setLocationName(reverseGeocode[0]?.city || "Unknown Location");
    }
  };

  const fetchUserInfo = async (userID: string) => {
    console.log("Hooray fetchUserInfo called!")
    const userDocRef = doc(db, 'users', userID);
    try {
      const userDocSnapshot = getDoc(userDocRef);
  
      if ((await userDocSnapshot).exists()) {
        const userData = (await userDocSnapshot).data();
        setUsername(userData?.username || "Unknown username");
        setProfileImg(userData?.profileImg || "Default profile image URL");
        console.log("profileimg: " + userData?.profileImg);
        console.log("username: " + userData?.username);
      } else {
        console.log(
          "User document does not exist SO I CANNOT GET USERNAME GRHHH!"
        );
        setUsername("Unknown username");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  return (
    <ScrollView>
      <Tab.Navigator>
        <Tab.Screen
          name="Newest"
          component={() => {
            return (
              <View>
                {posts.map((post) => (
                  <View key={Math.random()}>
                    <FeedPost
                      key={post.postID}
                      postID={post.postID}
                      userImage={profileImg}
                      image={post.image}
                      caption={post.caption}
                      username={username}
                      latitude={post.latitude}
                      longitude={post.longitude}
                      timestamp={post.timestamp}
                      locationName={post.locationName}
                    />
                    <MapView
                      style={{ height: 200 }}
                      key={Math.random()}
                      initialRegion={{
                        latitude: post.latitude,
                        longitude: post.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                      }}
                    >
                      {post.latitude && post.longitude && (
                        <Marker
                          coordinate={{
                            latitude: post.latitude,
                            longitude: post.longitude,
                          }}
                          title="Photo location"
                          identifier="Photo location"
                        />
                      )}
                    </MapView>
                  </View>
                ))}
              </View>
            );
          }}
        />
  
        <Tab.Screen
          name="City"
          component={() => (
            <View>
              {posts.map((post) => (
                <View key={Math.random()}>
                  <FeedPost
                    key={post.postID}
                    postID={post.postID}
                    userImage={profileImg}
                    image={post.image}
                    caption={post.caption}
                    username={username}
                    latitude={post.latitude}
                    longitude={post.longitude}
                    timestamp={post.timestamp}
                    locationName={post.locationName}
                  />
                  <MapView
                    style={{ height: 200 }}
                    key={Math.random()}
                    initialRegion={{
                      latitude: post.latitude,
                      longitude: post.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                  >
                    {post.latitude && post.longitude && (
                      <Marker
                        coordinate={{
                          latitude: post.latitude,
                          longitude: post.longitude,
                        }}
                        title="Photo location"
                        identifier="Photo location"
                      />
                    )}
                  </MapView>
                </View>
              ))}
            </View>
          )}
        />
  
        <Tab.Screen
          name="Search"
          component={() => (
            <View>
              <TextInput
                placeholder="Search posts..."
                onChangeText={(text) => setSearchKeyword(text)}
                value={searchKeyword}
              />
              <Button title="Search" onPress={() => searchPostsByKeyword(searchKeyword)} />
              {posts.map((post) => (
                <View key={Math.random()}>
                  <FeedPost
                    key={post.postID}
                    postID={post.postID}
                    userImage={profileImg}
                    image={post.image}
                    caption={post.caption}
                    username={username}
                    latitude={post.latitude}
                    longitude={post.longitude}
                    timestamp={post.timestamp}
                    locationName={post.locationName}
                  />
                  <MapView
                    style={{ height: 200 }}
                    key={Math.random()}
                    initialRegion={{
                      latitude: post.latitude,
                      longitude: post.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                  >
                    {post.latitude && post.longitude && (
                      <Marker
                        coordinate={{
                          latitude: post.latitude,
                          longitude: post.longitude,
                        }}
                        title="Photo location"
                        identifier="Photo location"
                      />
                    )}
                  </MapView>
                </View>
              ))}
            </View>
          )}
        />
      </Tab.Navigator>
    </ScrollView>
  );
  
}

export default ExplorePage;