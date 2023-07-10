import type {SessionTypes} from '@walletconnect/types';
import React, {type FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, DEVICE_WIDTH} from '../../../../commons';

type Props = {
  data: SessionTypes.Struct;
  onPress: () => void;
};

export const WalletConnectSession: FC<Props> = ({data, onPress}) => {
  const {name, icons, url} = data.peer.metadata;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={{uri: icons[0]}} style={styles.icon} />
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.url}>{url}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CONTAINER_PADDING = 12;
const CONTAINER_WIDTH = DEVICE_WIDTH - CONTAINER_PADDING * 2;

const ICON_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: CONTAINER_WIDTH,
    paddingVertical: 12,
    paddingHorizontal: CONTAINER_PADDING,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    width: ICON_SIZE + CONTAINER_PADDING,
  },
  bodyContainer: {
    width: CONTAINER_WIDTH - ICON_SIZE - CONTAINER_PADDING * 2,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  url: {
    color: colors.black2,
    fontSize: 12,
  },
});
