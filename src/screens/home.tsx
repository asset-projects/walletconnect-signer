import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {isConnectedState} from '../recoil/selector';
import {Wallet} from '../components/wallet';
import {NetworkComponent} from '../components/network';
import {NavigationButton} from '../components/navigationButton';

const Screen: React.VFC = () => {
  const isConnected = useRecoilValue(isConnectedState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBox}>
        <Wallet />
        <NetworkComponent />
      </View>

      {!isConnected && (
        <View style={styles.bottomBox}>
          <NavigationButton />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topBox: {
    flex: 4,
  },
  bottomBox: {
    flex: 1,
  },
});

export default Screen;
