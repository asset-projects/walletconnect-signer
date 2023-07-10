/**
 * @format
 */

import 'react-native-get-random-values';
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
