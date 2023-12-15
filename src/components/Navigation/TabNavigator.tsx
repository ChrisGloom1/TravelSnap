import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ExplorePage from "../../pages/ExplorePage/ExplorePage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import CameraComponent from "../CameraComponent/CameraComponent";


export type TabStackParamList = {
  Main: undefined;
  Profile: undefined;
  AddPhoto: undefined;
  Explore: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#ffefbf" },
        tabBarActiveTintColor: "#ff6b22",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#ffc0a0"
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Profile") {
            return (
              <Icon
                name="account"
                type="material-community"
                color={focused ? "#ff6b22" : "gray"}
              />
            );
          } else if (route.name === "AddPhoto") {
            return (
              <Icon
                name="diff-added"
                type="octicon"
                color={focused ? "#ff6b22" : "gray"}
              />
            );
          } else {
            return (
              <Icon
                name="magnifying-glass"
                type="entypo"
                color={focused ? "#ff6b22" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExplorePage} />
      <Tab.Screen name="AddPhoto" component={CameraComponent} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
