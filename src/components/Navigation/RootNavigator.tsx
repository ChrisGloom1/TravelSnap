import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import AddPostPage from '../../pages/AddPostPage/AddPostPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import ProfileSetupPage from '../../pages/ProfileSetupPage/ProfileSetupPage';

export type RootStackParamList = {
    LandingPage: undefined;
    ProfileSetupPage: undefined;
    Main: undefined;
    Register: undefined;
    Login: undefined;
    ChoosePhoto: undefined;
    AddPost: { image: string };
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName='LandingPage'>
      
      <RootStack.Screen name="LandingPage" component={LandingPage} />
      <RootStack.Screen name="ProfileSetupPage" component={ProfileSetupPage}/>
        
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator}/>
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name="AddPost" component={AddPostPage}/>
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name='Login' component={LoginPage}/>
      </RootStack.Group>

      <RootStack.Group>
        <RootStack.Screen name='Register' component={RegisterPage}/>
      </RootStack.Group>
      
    </RootStack.Navigator>
  )
}

export default RootNavigator