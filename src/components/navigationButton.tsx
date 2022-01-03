import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, View} from 'react-native';
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
    <View>
      <Button title="form" onPress={connectForm} />
      <Button title="open scanner" onPress={openScanner} />
    </View>
  );
};
