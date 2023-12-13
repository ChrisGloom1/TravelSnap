import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './src/pages/LoginPage/LoginPage';
import RootNavigator from './src/components/Navigation/RootNavigator';
import ExplorePage from './src/pages/ExplorePage/ExplorePage';
import { Text } from 'react-native';
import CameraComponent from './src/components/CameraComponent/CameraComponent';
import ImageDetailPage from './src/pages/ImageDetailPage/ImageDetailPage';
import FeedPost from './src/components/FeedPost/FeedPost';
import GalleryPost from './src/components/GalleryPost/GalleryPost';
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
