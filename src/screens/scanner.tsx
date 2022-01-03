import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {useWalletConnectHandler} from '../hooks/handler';

const Page: React.VFC = () => {
  const {onRead} = useWalletConnectHandler();

  return (
    <SafeAreaView style={styles.container}>
      <QRCodeScanner
        onRead={onRead}
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
      />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('screen').height,
  },
});
