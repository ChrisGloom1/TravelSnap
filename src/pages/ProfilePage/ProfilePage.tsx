// import { View, Text, ScrollView, Image, Button } from "react-native";
// import React, { useEffect, useState } from "react";
// import FeedPost, { FeedPostProps } from "../../components/FeedPost/FeedPost";
// import {
//   onSnapshot,
//   collection,
//   query,
//   orderBy,
//   QueryDocumentSnapshot,
//   Timestamp,
//   doc,
// } from "firebase/firestore";
// import { db, auth } from "../../../firebase";
// import MapView, { Marker } from "react-native-maps";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../components/Navigation/RootNavigator";
// import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";

// export type ProfilePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// function ProfilePage() {
//   const navigation = useNavigation<ProfilePageNavigationProp>();
//   const [posts, setPosts] = useState<FeedPostProps[]>([]);
//   const userId = auth.currentUser!.uid;
//   const [username, setUsername] = useState<string>("");
//   const [profileImg, setProfileImg] = useState<string>("");
//   const [bio, setBio] = useState<string>("");
//   const [locationName, setLocationName] = useState<string>("");

//   useEffect(() => {
//     const userDocRef = doc(db, `users`, userId);

//     // Pobierz dane użytkownika
//     const unsubscribeUser = onSnapshot(userDocRef, (userDocSnapshot) => {
//       if (userDocSnapshot.exists()) {
//         const userData = userDocSnapshot.data();
//         setUsername(userData?.username || "");
//         setProfileImg(userData?.profileImg || "");
//         setBio(userData?.profileBio || "");
//       } else {
//         console.log(
//           "User document does not exist SO I CANNOT GET USERNAME GRHHH!"
//         );
//         setUsername("");
//       }
//     });

//     const unsubscribePosts = onSnapshot(
//       query(
//         collection(db, `posts/${userId}/userPosts`),
//         orderBy("timestamp", "desc")
//       ),
//       (snapshot) => {
//         setPosts(
//           snapshot.docs.map((doc: QueryDocumentSnapshot) => {
//             const data = doc.data();
//             findLocationName(data.coords.latitude, data.coords.longitude)
//             console.log("LOCATION NAME BY POST CAPTION: " + locationName)
//             return {
//               postID: doc.id,
//               //userID: data.userID,
//               username: username,
//               userImage: profileImg,
//               image: data.image,
//               caption: data.caption,
//               timestamp: data.timestamp,
//               latitude: data.coords.latitude,
//               longitude: data.coords.longitude,
//               locationName: locationName
//             };
//           })
//         );
//       }
//     );

//     return () => {
//       console.log("Cleaning up...");
//       unsubscribeUser();
//       unsubscribePosts();
//     };
//   }, [db, userId, username, profileImg, bio]);

//   const findLocationName = async (lat: number, long: number) => {
//     let reverseGeocode = await Location.reverseGeocodeAsync({
//       latitude: lat,
//       longitude: long
//     });

//     if (reverseGeocode && reverseGeocode.length > 0) {
//       setLocationName(reverseGeocode[0]?.city || "Unknown Location");
//     }
//   }

//   return (
//     <ScrollView>
//       <Text>ProfilePage</Text>
//       <Image source={{ uri: profileImg }} className="w-8 h-8 rounded-full" />
//       <Text>{bio}</Text>
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <View key={Math.random()}>
//             <Button title="Edit profile" onPress={() => navigation.navigate('ProfileSetupPage')}/>
//             <FeedPost
//               key={post.postID}
//               postID={post.postID}
//               userImage={profileImg}
//               image={post.image}
//               caption={post.caption}
//               username={post.username}
//               latitude={post.latitude}
//               longitude={post.longitude}
//               timestamp={post.timestamp}
//               locationName={post.locationName}
//             />
//             <MapView
//               style={{ height: 200 }}
//               key={Math.random()}
//               initialRegion={{
//                 latitude: post.latitude,
//                 longitude: post.longitude,
//                 latitudeDelta: 0.005,
//                 longitudeDelta: 0.005,
//               }}
//             >
//               {post.latitude && post.longitude && (
//                 <Marker
//                   coordinate={{
//                     latitude: post.latitude,
//                     longitude: post.longitude,
//                   }}
//                   title="Photo location"
//                   identifier="Photo location"
//                 />
//               )}
//             </MapView>
//           </View>
//         ))
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </ScrollView>
//   );
// }

// export default ProfilePage;
import { Text, ScrollView, Image, View, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import FeedPost, { FeedPostProps } from "../../components/FeedPost/FeedPost";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  QueryDocumentSnapshot,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import ButtonBlue from "../../components/Button/ButtonBlue";
import { LinearGradient } from "expo-linear-gradient";
import GalleryPost from "../../components/GalleryPost/GalleryPost";

export type ProfilePageNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

function ProfilePage() {
  const navigation = useNavigation<ProfilePageNavigationProp>();
  const [posts, setPosts] = useState<FeedPostProps[]>([]);
  const userId = auth.currentUser!.uid;
  const [username, setUsername] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    const userDocRef = doc(db, `users`, userId);

    // Pobierz dane użytkownika
    const unsubscribeUser = onSnapshot(userDocRef, (userDocSnapshot) => {
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUsername(userData?.username || "");
        setProfileImg(userData?.profileImg || "");
        setBio(userData?.profileBio || "");
      } else {
        console.log(
          "User document does not exist SO I CANNOT GET USERNAME GRHHH!"
        );
        setUsername("");
      }
    });

    const unsubscribePosts = onSnapshot(
      query(
        collection(db, `posts/${userId}/userPosts`),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            findLocationName(data.coords.latitude, data.coords.longitude);
            console.log("LOCATION FROM PROFILEPAGE USEEFFECT: " + locationName);
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
      unsubscribeUser();
      unsubscribePosts();
    };
  }, [db, userId, username, profileImg, bio]);

  const findLocationName = async (lat: number, long: number) => {
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      setLocationName(reverseGeocode[0]?.city || "Unknown Location");
    }
  };

  return (
    <View>
      <ScrollView>
        <LinearGradient colors={['#ffc0a0', '#ffe7a0']}>
          <View>
            <View className="flex flex-row justify-between">
              <ButtonBlue
                label="Log out"
                onPress={() => console.log("Log out pressed")}
                // onPress={() => navigation.navigate("ProfileSetupPage")}
              />
              {/* <Image 
                source={require('../../../assets/ikon.png')}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              /> */}
              <ButtonBlue
                label="Edit profile"
                onPress={() => navigation.navigate("ProfileSetupPage")}
              />
            </View>
          <View className="flex-1 flex-row p-4 justify-between">
            <View>
              <Image source={{ uri: profileImg }} className="w-28 h-28 rounded-full mb-2" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-bold text-xl mb-1">{username}</Text>
              <View className="">
                <Text className="font-bold">About: 
                  <Text className="font-normal"> {bio}</Text>
                </Text>
              </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View className="border-b border-gray-400"/>
      </ScrollView>
      <FlatList
        numColumns={3}
        data={posts}
        keyExtractor={(item) => item.postID.toString()}
        refreshing={false}
        style={{ height: "72%"}}
        onRefresh={() => console.log("Refreshed")}
        renderItem={({ item }) => (
          <GalleryPost
            key={item.postID}
            postID={item.postID}
            username={item.username}
            userImage={item.userImage}
            image={item.image}
            caption={item.caption}
            timestamp={item.timestamp}
            latitude={item.latitude}
            longitude={item.longitude}
            locationName={item.locationName}
          />
      )}
    />
  </View>
  );
}

export default ProfilePage;
