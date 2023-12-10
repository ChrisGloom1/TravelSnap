import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export type FeedPostProps = {
  postID: string,
  userID: string;
  // userName: string;
  // userImage: string;
  image: string;
  caption: string;
  // timestamp: Timestamp;
  // latitude: number;
  // longitude: number;
};

const FeedPost = ({ postID, userID, image, caption }: FeedPostProps) => {

  const [postLiked, setPostLiked] = useState<Boolean>(false);

  const handleLikePress = () => {
   setPostLiked(!postLiked)
  }
  
  return (
    <View className="h-screen justify-center bg-gray-100">
      <View className="w-full">
        <View className="flex-row pr-2 pl-2 pt-1 pb-1">
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            className="w-8 h-8 rounded-full"
          />
          <Text className="text-lg pl-2">{userID}</Text>
        </View>
        <Image
          source={{ uri: image }} // "https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-[450]"
        />
      </View>
      <View className="flex-row pr-2 pl-2 pt-1 pb-1">
        <TouchableOpacity onPress={handleLikePress}>
          {postLiked ? <Text className="text-2xl ml-2">💜</Text> : <Text className="text-2xl ml-2">🤍</Text>}
          
        </TouchableOpacity>
        <Text className="text-2xl ml-2">💬</Text>
        <Text className="text-2xl ml-1">📍</Text>
      </View>
      <View className="justify-start pr-2 pl-2 pt-1 pb-1">
        <Text className="mr-2">
          <Text className="font-bold"> {userID} </Text>
          {caption}
        </Text>
      </View>
    </View>
  );
};

export default FeedPost;