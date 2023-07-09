import React, {type FC} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {COMMON_STYLES} from '../commons/styles';
import {HomeHeader} from '../components/homeHeader';
import {WalletCard} from '../features/wallet/components/walletCard';
import {WalletConnectSessions} from '../features/walletconnect/components/sessions';

const Screen: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <HomeHeader />
      <WalletCard />

      <WalletConnectSessions />
    </SafeAreaView>
  );
};

export default Screen;
