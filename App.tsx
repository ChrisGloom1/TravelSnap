import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedImage from './src/components/FeedPost/FeedPost';
import FeedPost from './src/components/FeedPost/FeedPost';
import ProfileSetupPage from './src/pages/ProfileSetupPage/ProfileSetupPage';
import RegisterPage from './src/pages/RegisterPage/RegisterPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
import CameraComponent from './src/components/CameraComponent/CameraComponent';
import LandingPage from './src/pages/LandingPage/LandingPage';
import RootNavigator from './src/components/Navigation/RootNavigator';
import ExplorePage from './src/pages/ExplorePage/ExplorePage';

export default function App() {
  return (
    <NavigationContainer>
      <ExplorePage/>
      {/* <RootNavigator/> */}
    </NavigationContainer>
  );
}