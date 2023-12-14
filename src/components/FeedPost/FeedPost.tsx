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
  locationName: string;
};

const FeedPost = ({
  postID,
  username,
  image,
  caption,
  userImage,
  locationName,
  timestamp,
}: FeedPostProps) => {

  
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

    return () => {
      unsubscribeComments();
      unsubscribeUsers();
    };
  }, [db]);

  // const fetchCommentersData = async (userID: string) => {
  //   const userDocRef = doc(db, `users`, userID);

  //   const unsubscribeUser = await onSnapshot(userDocRef, (userDocSnapshot) => {
  //     if (userDocSnapshot.exists()) {
  //       const userData = userDocSnapshot.data();
  //       setCommentersUsername(userData?.username || "");
  //       setCommentersProfileImg(userData?.profileImg || "");
  //     } else {
  //       console.log(
  //         "User document does not exist SO I CANNOT GET USERNAME GRHHH!"
  //       );
  //       setCommentersUsername("unknown user");
  //     }
  //   });
  //   return () => {
  //     unsubscribeUser();
  //   };
  // }

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

      console.log("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <View 
    // className="h-screen justify-center bg-gray-100"
    style={{height: "100%", justifyContent: 'center', backgroundColor: '#f0f0f0'}}
    >
      <View 
      // className="w-full"
      style={{width: '100%'}}
      >
        <View 
        // className="flex-row pr-2 pl-2 pt-1 pb-1"
        style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4}}
        >
          <Image
            source={{
              uri: userImage,
            }}
            // className="w-8 h-8 rounded-full"
            style={{width: 32, height: 32, borderRadius: 16}}
          />
          <Text 
          // className="text-lg pl-2"
          style={{fontSize: 16, paddingLeft: 8}}
          >{username}</Text>
        </View>
        <Image source={{ uri: image }} 
        // className="w-full h-[450]" 
        style={{width: '100%', height: 450}}
        />
      </View>
      <View 
      // className="flex-row pr-2 pl-2 pt-1 pb-1"
      style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 4}}
      >
        {/* <TouchableOpacity onPress={handleLikePress}>
          {postLiked ? <Text className="text-2xl ml-2">💜</Text> : <Text className="text-2xl ml-2">🤍</Text>}
          
        </TouchableOpacity> */}
        <Text 
        // className="text-2xl ml-2"
        style={{fontSize: 24, marginLeft: 8}}
        >💬</Text>
        <Text 
        // className="text-2xl ml-1"
        style={{fontSize: 24, marginLeft: 8}}
        >📍 {locationName}</Text>
        <Text 
        // className="text-2xl ml-2"
        style={{fontSize: 24, marginLeft: 8}}
        >{convertTimestamp(timestamp)}</Text>
      </View>
      <View 
      // className="justify-start pr-2 pl-2 pt-1 pb-1"
      style={{paddingHorizontal: 8, paddingVertical: 4}}
      >
        <Text 
        // className="mr-2"
        style={{marginRight: 8}}
        >
          <Text 
          // className="font-bold"
          style={{fontWeight: 'bold'}}
          > {username} </Text>
          {caption}
        </Text>
      </View>

      <View 
      // className="justify-start pr-2 pl-2 pt-1 pb-1"
      style={{paddingHorizontal: 8, paddingVertical: 4}}
      >
        <Image source={{ uri: userImage }} 
        // className="w-8 h-8 rounded-full" 
        style={{width: 32, height: 32, borderRadius: 16}}
        />
        <Input
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment..."
        />
        <Button title="Add" disabled={!comment.trim()} onPress={sendComment} />
      </View>

      {/** COMMENTS */}
      {comments.length > 0 && (
        <View 
        // className="justify-start pr-2 pl-2 pt-1 pb-1"
        style={{justifyContent: "flex-start", paddingHorizontal: 8, paddingVertical: 4}}
        >
          {comments.map((comment) => (
            <View key={comment.id}>
              <Image
                source={{ uri: commentersProfileImg }}
                // className="w-8 h-8 rounded-full"
                style={{width: 32, height: 32, borderRadius: 16}}
              />
              <Text 
              // className="mr-2"
              style={{marginRight: 8}}
              >
                <Text 
                // className="font-bold"
                style={{fontWeight: 'bold'}}
                > {commentersUsername} </Text>
                {comment.data().comment}
              </Text>
              {commentersUsername == comment.data().username && (
                <TouchableOpacity
                  onPress={() => {
                    deleteComment(comment.id);
                  }}
                >
                  <Icon name="delete" type="antdesign" />
                </TouchableOpacity>
              )}
              <Moment element={Text} fromNow>
                {comment.data().timestamp?.toDate().toString()}
              </Moment>
            </View>
          ))}
        </View>
      )}
      {/** COMMENTS END */}
    </View>
  );
};

export default FeedPost;