import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useNavigationEffect} from '../hooks/navigation';
import HomeScreen from '../screens/home';
import ScannerScreen from '../screens/scanner';
import ConnectFormScreen from '../screens/walletConnectForm';
import ProposalScreen from '../screens/proposal';
import RequestScreen from '../screens/request';

type StackParamList = {
  Home: undefined;
  Scanner: undefined;
  ConnectForm: undefined;
  Proposal: undefined;
  Request: undefined;
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
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="ConnectForm" component={ConnectFormScreen} />
        <Stack.Screen
          name="Proposal"
          component={ProposalScreen}
          options={{title: 'Wallet Connect'}}
        />
        <Stack.Screen
          name="Request"
          component={RequestScreen}
          options={{title: 'Wallet Connect'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
