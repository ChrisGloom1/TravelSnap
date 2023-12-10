import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './src/pages/LoginPage/LoginPage';
import RootNavigator from './src/components/Navigation/RootNavigator';
import { Text } from 'react-native';
export default function App() {
  return (
    <NavigationContainer>
      {/* <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
      <Text>Hello</Text> */}
      {/* <RegisterPage/> */}
      {/* <LoginPage/> */}
      <RootNavigator/>
    </NavigationContainer>
  );
}