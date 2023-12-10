import { View, Text, Image, Button, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RootStackParamList } from '../../components/Navigation/RootNavigator';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { db, storage, auth } from "../../../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Input from '../../components/Input/Input';


type AddPostScreenRouteProp = RouteProp<RootStackParamList, "AddPost">;

export type AddPhotoScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, "AddPhoto">,
NativeStackNavigationProp<RootStackParamList>
>

// type Props = {
//   item: string;
// }

const AddPostPage = () => { //{item} : Props
  const navigation = useNavigation<AddPhotoScreenNavigationProp>();
  const {params: {image}} = useRoute<AddPostScreenRouteProp>();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>('');
  console.log(`From AddPostPage mehhhh ${image}`);

  useEffect(() => {
    console.log('Image in AddPostPage:', image);
  }, [image]);
  // 1) Create a post and add it to firestore 'posts' collection
  // 2) get the post ID for the newly created post
  // 3) upload the image to firebase storage with the post ID
  // 4) get a download URL from fb storage and update the original post w/image

  const uploadPost = async () => {
    if(loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, 'posts'), {
      userID: auth.currentUser?.uid,
      caption: caption,
      timestamp: serverTimestamp()
    });
    console.log("New post added with ID", docRef.id);
    
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, image).then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL
      });
    })

    setLoading(false);
  }

  return (
    <View>
      <Text>AddPostPage</Text>
      <Image source={{uri: "https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}}/>
      <Input onInputChange={setCaption} placeholderText='Add caption'/>
      <Button title={loading ? "Uploading..." : "Upload"} onPress={uploadPost}/>
    </View>
  )
}

export default AddPostPage;