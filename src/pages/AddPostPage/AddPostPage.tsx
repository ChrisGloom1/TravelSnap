import { View, Text, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../../components/Navigation/RootNavigator';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { db, storage, auth } from "../../../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Input from '../../components/Input/Input';
import * as Location from "expo-location";
import { LinearGradient } from 'expo-linear-gradient';
import ButtonBlue from '../../components/Button/ButtonBlue';
import WelcomeToTravelSnap from '../../components/WelcomeToTravelSnap/WelcomeToTravelSnap';

type AddPostScreenRouteProp = RouteProp<RootStackParamList, "AddPost">;

export type AddPhotoScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "AddPhoto">,
NativeStackNavigationProp<RootStackParamList>
>

const AddPostPage = () => { //{item} : Props
  const navigation = useNavigation<AddPhotoScreenNavigationProp>();
  const {params: {image}} = useRoute<AddPostScreenRouteProp>();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<Location.LocationObject>();
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location permission status:", status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("LOCATION FROM ADDPOST USEEFFECT: " + JSON.stringify(location))
      findLocationName(location.coords.latitude, location.coords.longitude);
    })();
  }, [location])

  const findLocationName = async (lat: number, long: number) => {
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      setLocationName(reverseGeocode[0]?.city || "Unknown Location");
    }
  };
  
  const uploadPost = async () => {
    if (loading) return;

    if (!location) {
      console.log("Location is not available yet");
      return;
    }

    setLoading(true);
    const userId = auth.currentUser!.uid;
    const coords = { latitude: location.coords.latitude, longitude: location.coords.longitude,}

    try {
      // 1. Create a post and add it to firestore 'posts' collection
      const userPostsRef = collection(db, 'posts', userId, 'userPosts');
      const docRef = await addDoc(userPostsRef, {
        caption: caption,
        timestamp: serverTimestamp(),
        coords: coords
      });

      console.log("New post added with ID", docRef.id);

      // 2. Upload the image to firebase storage with the post ID
      const imageRef = ref(storage, `posts/${userId}/userPosts/${docRef.id}/image`);

      const response = await fetch(image);
      const blob = await response.blob();

      // 3. Determine file type of the image (f.ex. image/jpeg)
      const metadata = {
        contentType: "image/jpeg"
      };

      // 4. Send image's binary data into Firebase Storage
      await uploadBytes(imageRef, blob, metadata);

      // 5. Get a download URL from Firebase Storage and update the original post w/image
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', userId, 'userPosts', docRef.id), {
        image: downloadURL
      });

      setLoading(false);
      navigation.navigate('Main');

    } catch (error) {
      console.error("Error uploading post:", error);
      setLoading(false);
    }
  };

  return (
    <LinearGradient style={{flex: 1, alignItems: "center", padding: 16}} colors={['#ffc0a0', '#ffe7a0']}>
      <Image source={{uri: image}} style={{width: "90%", aspectRatio: 1, marginTop: 32, marginBottom: 16, borderRadius: 12}}/>
      <Input onInputChange={setCaption} placeholderText='Add caption'/>
      <ButtonBlue label={loading ? "Uploading..." : "Upload"} onPress={uploadPost}/>
    </LinearGradient>
  )
}

export default AddPostPage;

