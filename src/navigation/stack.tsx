import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';

type StackParamList = {
  Home: undefined;
  Scanner: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation: React.VFC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
