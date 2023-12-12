import { Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import FeedPost, { FeedPostProps } from "../../components/FeedPost/FeedPost";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  QueryDocumentSnapshot,
  Timestamp,
  doc 
} from "firebase/firestore";
import { db, auth } from "../../../firebase";

function ProfilePage() {
  const [posts, setPosts] = useState<FeedPostProps[]>([]);
  const userId = auth.currentUser!.uid;
  const [username, setUsername] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [bio, setBio] = useState<string>("");

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
        console.log('User document does not exist SO I CANNOT GET USERNAME GRHHH!');
        setUsername("");
      }
    });
  
    const unsubscribePosts = onSnapshot(
      query(collection(db, `posts/${userId}/userPosts`), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            return {
              postID: doc.id,
              userID: data.userID,
              username: username, 
              userImage: profileImg,
              image: data.image, 
              caption: data.caption,
              timestamp: data.timestamp,
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

  return (
    <ScrollView>
      <Text>ProfilePage</Text>
      <Image source={{uri: profileImg}} className="w-8 h-8 rounded-full"/>
      <Text>{bio}</Text>
      {posts.length > 0 ? (
        posts.map((post) => (
          <FeedPost
            key={post.postID}
            postID={post.postID}
            userImage={profileImg}
            image={post.image}
            caption={post.caption}
            username={post.username}
            // timestamp={post.timestamp}
          />
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

export default ProfilePage;
