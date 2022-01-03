import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '../navigation/stack';

export const NavigationButton: React.VFC = () => {
  const {navigate} = useNavigation<StackNavigationProp<'Home'>>();

  const connectForm = () => {
    navigate('ConnectForm');
  };

  const openScanner = () => {
    navigate('Scanner');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openScanner} style={styles.button}>
        <MaterialIcon name="qr-code-scanner" size={42} color="#FF5ACD" />
      </TouchableOpacity>

      <TouchableOpacity onPress={connectForm} style={styles.button}>
        <MaterialIcon name="edit" size={42} color="#FF5ACD" />
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
