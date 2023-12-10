import { Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FeedPost, { FeedPostProps } from "../../components/FeedPost/FeedPost";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

function ProfilePage() {
  const [posts, setPosts] = useState<FeedPostProps[]>([]);

  useEffect(() => {
    console.log("Fetching data...");
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        console.log("Data fetched:", snapshot.docs);
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            console.log("Image from useEffect: " + data.image);
            console.log("UserID from useEffect: " + data.userID);
            console.log("Caption from useEffect: " + data.caption);
            return {
              postID: doc.id,
              userID: data.userID,
              // userName: data.userName,
              // userImage: data.userImage,
              image: decodeURIComponent(data.image),
              caption: data.caption,
              timestamp: data.timestamp,
              // latitude: data.latitude,
              // longitude: data.longitude,
            };
          })
        );
      }
    );
    return () => {
      console.log("Cleaning up...");
      unsubscribe;
    };
  }, [db]);

  return (
    <ScrollView>
      <Text>ProfilePage</Text>
      {posts.length > 0 ? (
        posts.map((post) => (
          <FeedPost
            key={post.postID}
            postID={post.postID}
            image={post.image}
            caption={post.caption}
            userID={post.userID}
            // timestamp={post.timestamp}
          />
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      <FeedPost 
        key={1}
        postID="testID"
        image="https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        caption="Test caption"
        userID="test user ID"
      />
    </ScrollView>
  );
}

export default ProfilePage;
