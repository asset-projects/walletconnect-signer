import React, {type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {COLORS} from '../../commons';

type Props = {};

export const QRCodeScanner: FC<Props> = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const onPress = () => requestPermission();

  if (!hasPermission) {
    return (
      <View style={styles.cameraViewContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Main />;
};

const Main = () => {
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{fps: 60}, {videoResolution: 'max'}]);

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
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        format={format}
        isActive
      />
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
