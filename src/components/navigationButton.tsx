import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import type {StackNavigationProp} from '../navigation/stack';

export const NavigationButton: React.VFC = () => {
  const {navigate} = useNavigation<StackNavigationProp<'Home'>>();

  const connectForm = useCallback(() => {
    navigate('ConnectForm');
  }, []);

  const openScanner = useCallback(() => {
    navigate('Scanner');
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openScanner} style={styles.button}>
        <MaterialIcon name="qr-code-scanner" size={42} color="#A9C9FF" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={connectForm}
        style={[styles.button, styles.space]}>
        <MaterialIcon name="edit" size={42} color="#A9C9FF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  space: {
    marginLeft: 30,
  },
});
