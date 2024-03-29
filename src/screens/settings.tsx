import React, {type FC} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {COMMON_STYLES} from '../commons/styles';
import {WalletForm} from '../features/wallet';

const Screen: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <WalletForm />
    </SafeAreaView>
  );
};

export default Screen;
