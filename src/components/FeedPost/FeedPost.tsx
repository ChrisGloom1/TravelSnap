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
    const date = timestamp.toDate(); // Konwersja Timestamp na obiekt Date
  
    // Poniżej możesz dostosować formatowanie daty i godziny według własnych preferencji
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Dodaj zero z przodu dla jednocyfrowych miesięcy
    const day = date.getDate().toString().padStart(2, "0"); // Dodaj zero z przodu dla jednocyfrowych dni
    const hours = date.getHours().toString().padStart(2, "0"); // Dodaj zero z przodu dla jednocyfrowych godzin
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Dodaj zero z przodu dla jednocyfrowych minut
  
    // Zwróć sformatowaną datę i godzinę
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };
  

  return (
    <View 
    // className="justify-center"
    style={{justifyContent: 'center'}}
    >
      <View 
      // className="w-full"
      style={{width: '100%'}}
      >
        <View 
        // className="flex-row pr-2 pl-2 pt-1 pb-1"
        style={{flexDirection: 'row', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4}}
        >
          <Image
            source={{
              uri: userImage
                //"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            // className="w-6 h-6 rounded-full"
            style={{width: 24, height: 24, borderRadius: "50%"}}
          />
          <Text 
          // className="text-lg pl-2 text-sm"
          style={{fontSize: 16, paddingLeft: 8, paddingTop: 2}}
          >{username}</Text>
        </View>
        <Image
          source={{ uri: image }} // "https://images.unsplash.com/photo-1682685797406-97f364419b4a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // className="w-full h-[450]"
          style={{width: '100%', height: 450}}
        />
      </View>
      <View 
      // className="flex-row pr-2 pl-2 pt-1 pb-1"
      style={{flexDirection: 'row', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4}}
      >

        <TouchableOpacity onPress={handleLikePress}>
          <Text 
          // className="ml-2"
          style={{marginLeft: 8}}
          >{postLiked ? "💜" : "🤍"}</Text>
        </TouchableOpacity>

        <Text 
        // className="text-2xl ml-2"
        style={{fontSize: 16, marginLeft: 8}}
        >💬</Text>
        <Text style={{fontSize: 16, marginLeft: 8}}>📍 {locationName}</Text>
        <Text style={{fontSize: 16, marginLeft: 8}}>{convertTimestamp(timestamp)}</Text>
      </View>
      <View 
      // className="justify-start pr-2 pl-2 pt-1 pb-1"
      style={{justifyContent: 'flex-start', paddingRight: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4}}
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
    </View>
  );
};

export default FeedPost;