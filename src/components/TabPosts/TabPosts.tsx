import { FlatList, View } from "react-native";
import { FeedPostProps } from "../FeedPost/FeedPost";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import {
  QueryDocumentSnapshot,
  collection,
  count,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import GalleryPost from "../GalleryPost/GalleryPost";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../Input/Input";
import ButtonBlue from "../Button/ButtonBlue";

export type postsProps = {
  tabName: string;
  countryName: string;
};

const TabPosts = (props: postsProps) => {
  const [posts, setPosts] = useState<FeedPostProps[]>([]);
  const [isFromSearchBar, setIsFromSearchBar] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {

    if (props.tabName == "New") {
      setPosts([]);
      const unsubscribePosts = onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((doc: QueryDocumentSnapshot) => {
              const data = doc.data();
              return {
                postID: doc.id,
                username: data.username,
                userImage: data.profileImg,
                image: data.image,
                caption: data.caption,
                timestamp: data.timestamp,
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                city: data.city,
              };
            })
          );
        }
      );
      return () => {
        unsubscribePosts();
      };

    } else if (props.tabName == "Nearby") {
        const unsubscribePosts = onSnapshot(
            query(
              collection(db, "posts"),
              where("country", "==", props.countryName),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => {
              setPosts(
                snapshot.docs.map((doc: QueryDocumentSnapshot) => {
                  const data = doc.data();
                  return {
                    postID: doc.id,
                    username: data.username,
                    userImage: data.profileImg,
                    image: data.image,
                    caption: data.caption,
                    timestamp: data.timestamp,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    city: data.city,
                  };
                })
              );
            }
          );
          return () => {
            unsubscribePosts();
          };

    } else if (props.tabName == "Search") {
        setIsFromSearchBar(true);
    }
  }, [db]);

  const searchPostsByKeyword = async (keyword: string) => {
    
      setPosts([]);

      const trimmedKeyword = keyword.trim().toLowerCase();
      const firstLetter = trimmedKeyword.charAt(0).toUpperCase();
      const slicedKeyword = trimmedKeyword.slice(1);
      const preparedKeyword = firstLetter + slicedKeyword;
      console.log("Prepared keyword: " + preparedKeyword);
  
      const unsubscribePosts = onSnapshot(
        query(
          collection(db, "posts"),
          or(
            where("caption", "==", keyword),
            where("city", "==", keyword),
            where("country", "==", keyword),
            where("username", "==", keyword)
          ),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(snapshot.docs.map((doc: QueryDocumentSnapshot) => {
            const data = doc.data();
            return {
              postID: doc.id,
              username: data.username,
              userImage: data.profileImg,
              image: data.image,
              caption: data.caption,
              timestamp: data.timestamp,
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
              city: data.city
            };
          })
          )
        }
      );

      return () => {
        unsubscribePosts();
      };
  }

  return (
    <LinearGradient colors={['#ffc0a066', '#ffe7a066']} style={{height: "100%"}}>

      {isFromSearchBar && (
        <View>
          <Input placeholderText="Search 'Oslo' or 'Norway'" onInputChange={(text) => setSearchKeyword(text)}/>
          <ButtonBlue label="Search" onPress={() => {searchPostsByKeyword(searchKeyword)}}/>
        </View>
      )}

      <View>
        {posts.map((post) => (
          <View key={Math.random()}>

          <FlatList
            numColumns={3}
            data={posts}
            keyExtractor={(item) => item.postID.toString()}
            refreshing={false}
            onRefresh={() => console.log("Refreshed")}
            style={{height: "100%"}}
            renderItem={({ item }) => (
              <GalleryPost
                key={item.postID}
                postID={item.postID}
                username={item.username}
                userImage={item.userImage}
                image={item.image}
                caption={item.caption}
                timestamp={item.timestamp}
                latitude={item.latitude}
                longitude={item.longitude}
                locationName={item.city}
              />
              )}
            />
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};
export default TabPosts;
