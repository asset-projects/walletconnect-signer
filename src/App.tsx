/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationRoot} from './navigation';
import {WCClientContext} from './context/client';
import {SubscribeContext} from './context/subscribe';

const App: React.VFC = () => {
  return (
    <RecoilRoot>
      <WCClientContext>
        <SubscribeContext>
          <NavigationRoot />
        </SubscribeContext>
      </WCClientContext>
    </RecoilRoot>
  );
};

export default App;
