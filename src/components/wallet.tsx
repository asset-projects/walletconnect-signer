import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useWalletState} from '../context/wallet';
import {useConnectNetwork} from '../hooks/wallet';

export const Wallet: React.VFC = () => {
  const {wallet} = useWalletState();
  const connectNetworkList = useConnectNetwork();

  if (!wallet) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <LinearGradient colors={['#A9C9FF', '#FFBBEC']} style={styles.box}>
          <View>
            <Text style={styles.addressLabel}>ADDRESS</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              style={styles.addressText}>
              {wallet.address}
            </Text>
          </View>

          <View style={styles.networkContainer}>
            {connectNetworkList.length > 0 && (
              <Text style={styles.networkText}>{connectNetworkList[0]}</Text>
            )}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  inner: {
    shadowColor: '#A9C9FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.66,
    shadowRadius: 3.0,
    elevation: 5,
  },
  box: {
    justifyContent: 'space-between',
    height: 180,
    width: Dimensions.get('screen').width * 0.96,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
  },
  addressLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 6,
  },
  networkContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  networkText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 6,
  },
});
