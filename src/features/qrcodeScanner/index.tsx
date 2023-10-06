import React, {type FC} from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {COLORS} from '../../commons';
import type {FormValues} from '../walletconnect';

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
  const {setValue} = useFormContext<FormValues>();
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{fps: 60}, {videoResolution: 'max'}]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (!codes.length) {
        return;
      }

      const {type, value} = codes[0];

      if (type !== 'qr' || !value) {
        return;
      }

      if (!value.startsWith('wc:')) {
        return;
      }

      setValue('uri', value);
    },
  });

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
        codeScanner={codeScanner}
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
