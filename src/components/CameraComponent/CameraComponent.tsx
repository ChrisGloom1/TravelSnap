import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper"
import * as ImagePicker from "expo-image-picker";
import { CompositeNavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/RootNavigator";
import { TabStackParamList } from "../Navigation/TabNavigator";
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export type AddPhotoScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "AddPhoto">,
NativeStackNavigationProp<RootStackParamList>
>

const CameraComponent = () => {
  const navigation = useNavigation<AddPhotoScreenNavigationProp>();

  const [hasCameraPermission, setHasCameraPermission] = useState<Boolean | null >(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<Boolean | null >(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // Images only, no other media to be uploaded
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }


  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>
  }

  return(
    <LinearGradient style={{flex: 1}} colors={['#ffc0a066', '#ffe7a066']}>
      <View style={{flex: 1, flexDirection: 'row'}} >
        <Camera 
          ref={ref => setCamera(ref)}
          style={{flex: 1, aspectRatio: 1}}
          type={type} 
          ratio="1:1"
        />
      </View>
        { 
          image && <Image source={{uri: image}} style={{flex: 1, marginTop: 96, marginBottom: 32, marginLeft: 12, marginRight: 12}}/> 
        }
        { 
          image ? 
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32}}>
            <Button mode="outlined" onPress={() => setImage(null)}>❌</Button>
            <Button mode="outlined" onPress={() => navigation.navigate('AddPost', {image: image})}>✅</Button>
          </View>
          : 
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32}}>
            <Button mode="outlined" onPress={() => pickImage()}>🖼️</Button>
          <Button mode="outlined" onPress={() => {
              setType(
                type === CameraType.back
                ? CameraType.front
                : CameraType.back
              )
          }}>
            🔄
          </Button>
          <Button mode="outlined" onPress={() => takePicture()}>📸</Button>
          </View>
        }
      </LinearGradient>
  )
}

export default CameraComponent;

