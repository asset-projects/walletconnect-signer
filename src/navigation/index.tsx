import React, {type FC} from 'react';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import ScanScreen from '../screens/scan';
import SettingsScreen from '../screens/settings';
import WalletConnectSessionScreen from '../screens/walletConnectSession';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  WalletConnectSession: {topic: string};
  Settings: undefined;
};

type StackScreenName = keyof RootStackParamList;

export type RootStackNavigationProp<T extends StackScreenName> =
  NativeStackNavigationProp<RootStackParamList, T>;
export type RootStackRouteProps<T extends StackScreenName> = RouteProp<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="WalletConnectSession"
          component={WalletConnectSessionScreen}
          options={{headerShown: true}}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
