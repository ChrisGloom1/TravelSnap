import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import AddPhotoPage from '../../pages/AddPhotoPage/AddPhotoPage';
import ExplorePage from '../../pages/ExplorePage/ExplorePage';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "@rneui/themed";

export type TabStackParamList = {
    Profile: undefined;
    Add: undefined;
    Explore: undefined;
}

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,

    })
  }, [])

  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarActiveTintColor: "#cf5ee6",
        tabBarInactiveTintColor: "#8c8c8c",
        tabBarIcon: ({focused, color, size }) => {
            if (route.name === 'Profile') {
                return (
                    <Icon
                        name="account"
                        type="material-community"
                        color={focused ? "#cf5ee6" : "gray"}
                    />
                );
            } else if (route.name === 'Add') {
                return (
                    <Icon
                        name="diff-added"
                        type="octicon"
                        color={focused ? "#cf5ee6" : "gray"}
                    />
                )
            } else {
                return (
                    <Icon
                        name="magnifying-glass"
                        type='entypo'
                        color={focused ? "#cf5ee6" : "gray"}
                />  
                )
            }
        }
    })}>
      <Tab.Screen name="Profile" component={ProfilePage}/>
      <Tab.Screen name="Add" component={AddPhotoPage}/>
      <Tab.Screen name="Explore" component={ExplorePage}/>
    </Tab.Navigator>
  )
}

export default TabNavigator