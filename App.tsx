import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraComponent from './src/components/CameraComponent/CameraComponent';
import ProfileSetupPage from './src/pages/ProfileSetupPage/ProfileSetupPage';
import RegisterPage from './src/pages/RegisterPage/RegisterPage';
import LoginPage from './src/pages/LoginPage/LoginPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <ProfileSetupPage />
    // </NavigationContainer>
  );
}