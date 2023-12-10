import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export type FeedPostProps = {
  postID: string,
  username: string;
  userImage: string;
  image: string;
  caption: string;
  timestamp: Timestamp;
  latitude: number;
  longitude: number;
  locationName: string
};

const FeedPost = ({ username, image, caption, userImage, locationName, timestamp }: FeedPostProps) => {

  const [postLiked, setPostLiked] = useState<Boolean>(false);

  const handleLikePress = () => {
   setPostLiked(!postLiked)
  }
  
  const convertTimestamp = (timestamp: Timestamp): string => {
    const now = new Date();
    const postTime = timestamp.toDate();
    const timeDifference = now.getTime() - postTime.getTime();
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
  
    if (timeDifference < secondsInMinute) {
      const secondsAgo = Math.floor(timeDifference);
      return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < secondsInHour) {
      const minutesAgo = Math.floor(timeDifference / secondsInMinute);
      return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < secondsInDay) {
      const hoursAgo = Math.floor(timeDifference / secondsInHour);
      return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < secondsInWeek) {
      const daysAgo = Math.floor(timeDifference / secondsInDay);
      return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    } else {
      const weeksAgo = Math.floor(timeDifference / secondsInWeek);
      return `${weeksAgo} week${weeksAgo === 1 ? '' : 's'} ago`;
    }
  };
  

  return (
    <View className="h-screen justify-center bg-gray-100">
      <View className="w-full">
        <View className="flex-row pr-2 pl-2 pt-1 pb-1">
          <Image
            source={{
              uri: userImage
                //"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            className="w-8 h-8 rounded-full"
          />
          <Text className="text-lg pl-2">{username}</Text>
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
        <Text className="text-2xl ml-1">📍 {locationName}</Text>
        <Text className="text-2xl ml-2">{convertTimestamp(timestamp)}</Text>
      </View>
      <View className="justify-start pr-2 pl-2 pt-1 pb-1">
        <Text className="mr-2">
          <Text className="font-bold"> {username} </Text>
          {caption}
        </Text>
      </View>
    </View>
  );
};

export default FeedPost;