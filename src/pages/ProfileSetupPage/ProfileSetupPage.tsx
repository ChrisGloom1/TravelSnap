import { useEffect, useState } from "react";
import {
  View, Text,
} from "react-native";
import Input from "../../components/Input/Input";
import ButtonBlue from "../../components/Button/ButtonBlue";
import SetupProfileImage from "../../components/SetupProfileImage/SetupProfileImage";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../../components/Navigation/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigation/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

export type ProfileSetupScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Main">,
  NativeStackNavigationProp<RootStackParamList>
>;

const ProfileSetupPage = () => {
  const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<Boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [bio, setBio] = useState<string>();
  const [generalLocation, setGeneralLocation] = useState<string>("");
  const [isBioChanged, setIsBioChanged] = useState<boolean>(false);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

  const userID = auth.currentUser!.uid;

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        setGeneralLocation(reverseGeocode[0]?.city || "Unknown Location");
      }
      
    })();

   
  }, [image]);

 const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsImageChanged(true);
    }
  };

  if (hasGalleryPermission === null) {
    return <View />;
  }
  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>;
  }

  const handleBioChange = async (text: string) => {
    setBio(text);
    setIsBioChanged(true);
  };
  

  const handleProfileUpdate = async () => {
    if (isBioChanged) {
      await updateDoc(doc(db, "users", userID), {
        profileBio: bio,
      });
    }
    if (isImageChanged) {
      await updateDoc(doc(db, "users", userID), {
        profileImg: image,
      });
    }

    const imageRef = ref(storage, `users/${userID}/profileImg`);
    const response = await fetch(image!);
    const blob = await response.blob();

    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(imageRef, blob, metadata);

    const downloadURL = await getDownloadURL(imageRef);

    await updateDoc(doc(db, "users", userID), {
      profileImg: downloadURL,
    });
    navigation.navigate("Main");
  };

  return (
    <LinearGradient style={{display: "flex", alignItems: 'center'}} colors={['#ffc0a066', '#ffe7a066']}>
      <View style={{width: '90%', height: '100%', alignItems: 'center', marginTop: 32}}>
        <SetupProfileImage onPress={pickImage} image={image || ""} />
        <Text style={{marginRight: 8}}>{ generalLocation }</Text>
        <Input placeholderText="Bio" onInputChange={handleBioChange} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ButtonBlue label="Continue" onPress={handleProfileUpdate} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileSetupPage;
