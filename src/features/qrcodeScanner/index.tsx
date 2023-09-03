import React, {type FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../commons';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

type Props = {};

export const QRCodeScanner: FC<Props> = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  if (device == null) {
    return (
      <View style={styles.cameraViewContainer}>
        <Text style={styles.text}>
          QRCodeScanner is currently under preparation.
        </Text>

        <Text style={styles.text}>Please enter uri from form</Text>
      </View>
    );
  }

  return (
    <View style={styles.cameraViewContainer}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
