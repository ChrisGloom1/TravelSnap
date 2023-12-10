import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper"
import * as ImagePicker from "expo-image-picker";
import { CompositeNavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/RootNavigator";
import { TabStackParamList } from "../Navigation/TabNavigator";
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AddPostScreenRouteProp = RouteProp<RootStackParamList, "AddPost">;

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
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    (async () => {
      // check for camera permissions
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      // check for image picker permissions
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    })
    console.log(result)

    if (!result.canceled) {
      // setImage(result.assets[0].uri)
      setImage(result.assets[0].uri)
    }
  }
  
  const printImageData = (image: string) => {
    console.log(image)
  }

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>
  }

  return(
    <View className="flex-1">
      <View className="flex-1 flex-row">
        <Camera 
        ref={ref => setCamera(ref)}
        className="flex-1 aspect-square" 
        type={type} 
        ratio="1:1"
        />
      </View>
        { 
          image && <Image source={{uri: image}} className="flex-1 mt-24 mb-8 ml-4 mr-4"/> 
        }
        { 
          image ? 
          <View className="flex-row justify-around mb-8">
            <Button
              mode="outlined"
              onPress={() => setImage(null)}
            >
              ❌
            </Button>
            <Button
              mode="outlined"
              //onPress={() => printImageData(image)}
              onPress={() => navigation.navigate('AddPost', {image: image})}
            >
              ✅
            </Button>
          </View>
          : 
          <View className="flex-row justify-around mb-8">
            <Button
            mode="outlined"
            onPress={() => pickImage()}
          >
            🖼️
          </Button>
          <Button 
            mode="outlined"
            onPress={() => {
              setType(
                type === CameraType.back
                ? CameraType.front
                : CameraType.back
              )
          }}>
            🔄
          </Button>
          <Button
            mode="outlined"
            onPress={() => takePicture()}
          >
            📸
          </Button>
          </View>
        }

      </View>
  )
}

export default CameraComponent;

