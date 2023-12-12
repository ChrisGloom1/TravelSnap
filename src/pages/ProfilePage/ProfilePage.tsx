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
import { Text, ScrollView, Image, View, Button } from "react-native";
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
    <ScrollView>
      <Text>ProfilePage</Text>
      <Image source={{ uri: profileImg }} className="w-8 h-8 rounded-full" />
      <Text>{bio}</Text>
      <Button
              title="Edit profile"
              onPress={() => navigation.navigate("ProfileSetupPage")}
            />
      {posts.length > 0 ? (
        posts.map((post) => (
          <View key={Math.random()}>
            <FeedPost
              key={post.postID}
              postID={post.postID}
              userImage={profileImg}
              image={post.image}
              caption={post.caption}
              username={post.username}
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
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

export default ProfilePage;
