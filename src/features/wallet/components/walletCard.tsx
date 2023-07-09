import React, {type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {DEVICE_WIDTH} from '../../../commons/styles';
import type {RootStackNavigationProp} from '../../../navigation';
import {walletState} from '../../../recoil/wallet';

export const WalletCard: FC = () => {
  const {navigate} = useNavigation<RootStackNavigationProp<'Home'>>();
  const {address} = useRecoilValue(walletState);

  const onPress = () => {
    navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={onPress} style={styles.editButton}>
            <Text style={styles.editButtonLabel}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.addressLabel}>ADDRESS</Text>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.address}>
          {address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  card: {
    height: 150,
    width: DEVICE_WIDTH * 0.96,
    backgroundColor: '#37ABFF',
    padding: 10,
    borderRadius: 12,
    // shadow
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.6,
    elevation: 6,
  },
  editButtonContainer: {
    alignItems: 'flex-end',
  },
  editButton: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  editButtonLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  addressLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  address: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
});
