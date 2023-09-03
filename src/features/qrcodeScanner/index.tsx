import React, {type FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../commons';

type Props = {};

export const QRCodeScanner: FC<Props> = () => {
  return (
    <View style={styles.cameraViewContainer}>
      <Text style={styles.text}>
        QRCodeScanner is currently under preparation.
      </Text>

      <Text style={styles.text}>Please enter uri from form</Text>
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
