import React, {type FC} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {COMMON_STYLES} from '../commons/styles';
import {WalletForm} from '../features/wallet';

const Screen: FC = () => {
  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar barStyle={'light-content'} />

      <WalletForm />
    </SafeAreaView>
  );
};

export default Screen;
