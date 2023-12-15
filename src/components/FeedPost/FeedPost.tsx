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
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { auth, db } from "../../../firebase";
import Moment from "react-moment";

export type FeedPostProps = {
  postID: string;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  timestamp: Timestamp;
  latitude: number;
  longitude: number;
  city: string;
};

const FeedPost = ({
  postID,
  username,
  image,
  caption,
  userImage,
  city,
  timestamp,
}: FeedPostProps) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<QueryDocumentSnapshot[]>([]);
  const [commentersUsername, setCommentersUsername] =
    useState<string>("unknown user");
  const [commentersProfileImg, setCommentersProfileImg] =
    useState<string>("");

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

    return () => {
      unsubscribeComments();
      unsubscribeUsers();
    };
  }, [db]);

  const convertTimestamp = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
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
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <View style={{height: "100%", justifyContent: 'center', backgroundColor: '#f0f0f0'}}>
      <View style={{width: '100%'}}>
        <View style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4}}>
          <Image source={{ uri: userImage }} style={{width: 32, height: 32, borderRadius: 16}}/>
          <Text style={{fontSize: 16, paddingLeft: 8}}>{username}</Text>
        </View>
        <Image source={{ uri: image }} style={{width: '100%', height: 450}}/>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4}}>
        <Text style={{fontSize: 24, marginLeft: 8}}>💬</Text>
        <Text style={{fontSize: 24, marginLeft: 8}}>📍 {city}</Text>
        <Text style={{fontSize: 24, marginLeft: 8}}>{convertTimestamp(timestamp)}</Text>
      </View>
      <View style={{paddingHorizontal: 8, paddingVertical: 4}}>
        <Text style={{marginRight: 8}}>
          <Text style={{fontWeight: 'bold'}}> {username} 
          </Text>{caption}</Text>
      </View>

      <View style={{paddingHorizontal: 8, paddingVertical: 4}}>
        <Image source={{ uri: commentersProfileImg }} style={{width: 32, height: 32, borderRadius: 16}}/>
        <Input
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment..."
        />
        <Button 
          title="Add" 
          disabled={!comment.trim()} 
          onPress={sendComment} 
        />
      </View>

      // comment section start
      {comments.length > 0 && (
        <View style={{justifyContent: "flex-start", paddingHorizontal: 8, paddingVertical: 4}}>
          {comments.map((comment) => (
            <View key={comment.id}>
              <Image source={{ uri: comment.data().profileImg }} style={{width: 32, height: 32, borderRadius: 16}}/>
              <Text style={{marginRight: 8}}>
                <Text style={{fontWeight: 'bold'}}> {comment.data().username} </Text>
                {comment.data().comment}
              </Text>
              {commentersUsername == comment.data().username && (
                <TouchableOpacity
                  onPress={() => {deleteComment(comment.id)}}>
                  <Icon name="delete" type="antdesign"/>
                </TouchableOpacity>
              )}
              <Moment element={Text} fromNow>
                {comment.data().timestamp?.toDate().toString()}
              </Moment>
            </View>
          ))}
        </View>
      )}
      // end of comment section
    </View>
  );
};

export default FeedPost;
