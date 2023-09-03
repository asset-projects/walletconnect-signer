import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRecoilValue} from 'recoil';
import {COLORS, DEVICE_WIDTH} from '../../../commons';
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
      <Animated.View style={styles.card} entering={FadeInUp.delay(100)}>
        <Animated.View
          style={styles.editButtonContainer}
          entering={FadeIn.delay(200)}>
          <TouchableOpacity onPress={onPress} style={styles.editButton}>
            <Icon name="settings" color={COLORS.white} size={24} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          style={styles.addressLabel}
          entering={FadeInUp.delay(200)}>
          ADDRESS
        </Animated.Text>

        <Animated.Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.address}
          entering={FadeInUp.delay(200)}>
          {address}
        </Animated.Text>
      </Animated.View>
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
    backgroundColor: COLORS.cyan,
    padding: 10,
    borderRadius: 12,
    // shadow
    shadowColor: COLORS.shadow,
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
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  address: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
});
