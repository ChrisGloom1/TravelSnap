import { Text, View, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../components/Navigation/RootNavigator';

export type LandingPageProps = {
  navigation: NavigationProp<RootStackParamList, 'LandingPage'>;
};

const LandingPage: React.FC<LandingPageProps> = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View>
      <Text>LandingPage</Text>
      <Button title="Login" onPress={handleLoginPress} />
      <Button title="Register" onPress={handleRegisterPress} />
    </View>
  );
};

export default LandingPage;

