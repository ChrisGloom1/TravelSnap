import { Icon, Input } from "@rneui/base";
import {
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Button, ScrollView } from "react-native";
import { auth, db } from "../../../firebase";
import Moment from "react-moment";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../components/Navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export type ImageDetailPageProps = {
  postID: string;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  timestamp: Timestamp;
  latitude: number;
  longitude: number;
  locationName: string;
};

type ImageDetailScreenRouteProp = RouteProp<RootStackParamList, "ImageDetail">;

const ImageDetailPage = () => {

  const {params: {  postID, username, userImage, image, caption, timestamp, latitude, longitude, locationName}} = useRoute<ImageDetailScreenRouteProp>();
  const [cityName, setCityName] = useState<string>("")
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<QueryDocumentSnapshot[]>([]);
  const [commentersUsername, setCommentersUsername] =
    useState<string>("unknown user");
  const [commentersProfileImg, setCommentersProfileImg] =
    useState<string>("unknown user");

  useEffect(() => {
    const unsubscribeComments = onSnapshot(
      query(
        collection(db, "posts", postID, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );

    const unsubscribeUsers = onSnapshot(
      doc(db, `users`, auth.currentUser!.uid),
      (snapshot) => {
        const userData = snapshot.data();
        setCommentersUsername(userData?.username || "");
        setCommentersProfileImg(userData?.profileImg || "");
      }
    );

    findCityName(latitude, longitude)

    return () => {
      unsubscribeComments();
      unsubscribeUsers();
    };

  }, [db]);


  const findCityName = async (lat: number, long: number) => {
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      setCityName(reverseGeocode[0]?.city || "Unknown Location");
    }
  };

  const convertTimestamp = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}.${month}.${year}`;
  };

  const sendComment = async () => {
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", postID, "comments"), {
      comment: commentToSend,
      username: commentersUsername,
      profileImg: commentersProfileImg,
      timestamp: serverTimestamp(),
    });
  };

  const deleteComment = async (commentID: string) => {
    try {
      const commentDocRef = doc(db, "posts", postID, "comments", commentID);

      // Delete the comment document from the database
      await deleteDoc(commentDocRef);

      console.log("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <LinearGradient colors={['#ffc0a066', '#ffe7a066']} style={{height: "100%", justifyContent: 'center', paddingBottom: 48}}>
      <ScrollView>

        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 8, alignItems: "center"}}>
            <Image source={{ uri: userImage }} style={{width: 32, height: 32, borderRadius: 16}}/>
            <Text style={{fontSize: 16, paddingLeft: 8}}>{username}</Text>
          </View>
          <Image source={{ uri: image }} style={{ width: '100%', height: 450 }}/>
        </View>

        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "space-between", paddingRight: 8}}>
          <Text style={{fontSize: 14, marginLeft: 8}}>📍 {cityName ? cityName : "Unknown"}</Text>
          <Text style={{fontSize: 14, marginLeft: 8}}>{convertTimestamp(timestamp)}</Text>
        </View>

        <View style={{paddingHorizontal: 8, paddingVertical: 8}}>
          <Text style={{marginRight: 8}}><Text style={{fontWeight: 'bold'}}>{username}</Text> {caption}</Text>
        </View>

        <MapView
              style={{ height: 200, margin: 12 }}
              key={Math.random()}
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

        <View style={{paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center"}}>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", width: "90%"}}>
            <Image source={{ uri: commentersProfileImg }} style={{width: 32, height: 32, borderRadius: 16, marginTop: -18 }}/>
            <Input
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment..."
            />
          </View>
          <View style={{display: "flex"}}>
            <Button title="Add" disabled={!comment.trim()} onPress={sendComment}/>
          </View>
        </View>

        {/** COMMENTS */}
        {comments.length > 0 && (
          <View style={{justifyContent: "flex-start", paddingHorizontal: 8, paddingVertical: 4, marginBottom: 64}}>
            {comments.map((comment) => (
              <View key={comment.id} style={{paddingVertical: 8}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>

                  <View style={{flexDirection: "row"}}>
                    <Image source={{ uri: comment.data().profileImg }} style={{width: 32, height: 32, borderRadius: 16}}/>
                    <Text style={{paddingHorizontal: 8, width: "85%"}}>
                      <Text style={{fontWeight: 'bold'}}>{comment.data().username} </Text>
                      {comment.data().comment}
                    </Text>
                  </View>

                  <View>
                    {commentersUsername == comment.data().username && (
                      <TouchableOpacity
                        onPress={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        <Icon name="delete" type="antdesign" color={"red"}/>
                      </TouchableOpacity>
                    )}
                  </View>

                </View>
                <Moment element={Text} fromNow>
                  {comment.data().timestamp?.toDate().toString()}
                </Moment>
              </View>
            ))}
          </View>
        )}
        {/** COMMENTS END */}
      </ScrollView>
    </LinearGradient>
  );
};

export default ImageDetailPage;