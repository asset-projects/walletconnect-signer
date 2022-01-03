import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import ConnectFormScreen from '../screens/walletConnectForm';
import ProposalScreen from '../screens/proposal';
import {useNavigationEffect} from '../hooks/navigation';

type StackParamList = {
  Home: undefined;
  Scanner: undefined;
  ConnectForm: undefined;
  Proposal: undefined;
};

type StackScreens = keyof StackParamList;

export type StackNavigationProp<T extends StackScreens> =
  NativeStackNavigationProp<StackParamList, T>;

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation: React.VFC = () => {
  useNavigationEffect();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen name="ConnectForm" component={ConnectFormScreen} />
        <Stack.Screen
          name="Proposal"
          component={ProposalScreen}
          options={{title: 'Wallet Connect'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
