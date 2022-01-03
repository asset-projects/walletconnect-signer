import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useWalletState} from '../context/wallet';

export const Wallet: React.VFC = () => {
  const {wallet} = useWalletState();

  if (!wallet) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.addressLabel}>ADDRESS</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.addressText}>
          {wallet.address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    height: 120,
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: '#efefef',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  addressLabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
  },
});
