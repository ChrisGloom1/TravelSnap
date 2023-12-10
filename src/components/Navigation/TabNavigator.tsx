import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import ExplorePage from "../../pages/ExplorePage/ExplorePage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import CameraComponent from "../CameraComponent/CameraComponent";
import HomePage from "../../pages/HomePage/HomePage";


export type TabStackParamList = {
  Home: undefined;
  Profile: undefined; // TODO - add param userId for inlogged user
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
        tabBarActiveTintColor: "#cf5ee6",
        tabBarInactiveTintColor: "#8c8c8c",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Icon
                name="home"
                type="entypo"
                color={focused ? "#cf5ee6" : "gray"}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Icon
                name="account"
                type="material-community"
                color={focused ? "#cf5ee6" : "gray"}
              />
            );
          } else if (route.name === "AddPhoto") {
            return (
              <Icon
                name="diff-added"
                type="octicon"
                color={focused ? "#cf5ee6" : "gray"}
              />
            );
          } else {
            return (
              <Icon
                name="magnifying-glass"
                type="entypo"
                color={focused ? "#cf5ee6" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="AddPhoto" component={CameraComponent} />
      <Tab.Screen name="Explore" component={ExplorePage} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
