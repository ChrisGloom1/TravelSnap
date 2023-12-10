import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { TabStackParamList } from '../../components/Navigation/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/Navigation/RootNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type HomeScreenNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, 'Home'>,
NativeStackNavigationProp<RootStackParamList>
>;

export default function HomePage() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Text>HomePage</Text>
    </View>
  )
}
