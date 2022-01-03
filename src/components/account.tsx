import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useWalletState} from '../context/wallet';

export const Account: React.VFC = () => {
  const {wallet} = useWalletState();

  if (!wallet) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Accounts</Text>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <View style={styles.accountContainer}>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.account}>
          {wallet.address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountContainer: {
    paddingTop: 12,
    paddingLeft: 12,
  },
  account: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
