import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {colors, DEVICE_WIDTH} from '../../../commons';
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
            <Icon name="settings" color={colors.white} size={24} />
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
    backgroundColor: colors.cyan,
    padding: 10,
    borderRadius: 12,
    // shadow
    shadowColor: colors.shadow,
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
  addressLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  address: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
});
