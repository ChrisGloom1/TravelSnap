import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedImage from './src/components/FeedPost/FeedPost';
import FeedPost from './src/components/FeedPost/FeedPost';
import CameraComponent from './src/components/CameraComponent/CameraComponent';
import { Camera } from 'expo-camera';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <CameraComponent />
    // </NavigationContainer>
  );
}