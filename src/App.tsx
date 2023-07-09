/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {type FC} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {COMMON_STYLES} from './commons/styles';
import {WalletConnectBottomSheetProvider} from './features/walletconnect/context/bottomSheetProvider';
import {WalletConnectBottomSheet} from './features/walletconnect/components/bottomSheet';
import {WalletConnectProvider} from './features/walletconnect/context/walletConnectProvider';
import {useWalletConnectEffects} from './features/walletconnect/hooks/useWalletConnectEffects';
import {useInitialization} from './hooks/useInitialization';
import Navigation from './navigation';

const App: FC = () => {
  return (
    <GestureHandlerRootView style={COMMON_STYLES.flex1}>
      <RecoilRoot>
        <WalletConnectProvider>
          <WalletConnectBottomSheetProvider>
            <Main />
          </WalletConnectBottomSheetProvider>
        </WalletConnectProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

const Main: FC = () => {
  const {onInitialize} = useInitialization();

  useWalletConnectEffects();

  return (
    <NavigationContainer onReady={onInitialize}>
      <Navigation />
      <WalletConnectBottomSheet />
    </NavigationContainer>
  );
};

export default App;
