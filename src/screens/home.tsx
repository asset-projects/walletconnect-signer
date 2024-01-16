import React, {type FC} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {COMMON_STYLES} from '../commons/styles';
import {HomeHeader} from '../components/homeHeader';
import {WalletCard} from '../features/wallet';
import {WalletConnectSessions} from '../features/walletconnect';

const Screen: FC = () => {
  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar />

      <HomeHeader />
      <WalletCard />

      <WalletConnectSessions />
    </SafeAreaView>
  );
};

export default Screen;
