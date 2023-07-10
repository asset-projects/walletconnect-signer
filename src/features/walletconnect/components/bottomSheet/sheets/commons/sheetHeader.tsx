import React, {type FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DEVICE_WIDTH, colors} from '../../../../../../commons';

type Props = {
  icon: string;
  name: string;
  url: string;
};

export const SheetHeader: FC<Props> = ({icon, name, url}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={{uri: icon}} style={styles.icon} />
      </View>

      <View style={styles.bodyContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.appName}>
          {name}
        </Text>

        <Text style={styles.text}>would like to connect</Text>

        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.url}>
          {url}
        </Text>
      </View>
    </View>
  );
};

const CONTAINER_PADDING = 12;
const APP_ICON_SIZE = 60;
const IMAGE_CONTAINER_WIDTH = APP_ICON_SIZE + CONTAINER_PADDING;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: IMAGE_CONTAINER_WIDTH,
  },
  bodyContainer: {
    width: DEVICE_WIDTH - CONTAINER_PADDING * 2 - IMAGE_CONTAINER_WIDTH,
  },
  icon: {
    width: APP_ICON_SIZE,
    height: APP_ICON_SIZE,
    borderRadius: APP_ICON_SIZE / 2,
  },
  appName: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: colors.black,
    fontSize: 16,
  },
  url: {
    color: colors.black2,
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 4,
  },
});
