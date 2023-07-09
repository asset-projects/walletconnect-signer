import React, {useCallback, type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {type RootStackNavigationProp} from '../navigation';
import {connectState} from '../recoil/wallet';

export const HomeHeader: FC = () => {
  const {navigate} = useNavigation<RootStackNavigationProp<'Home'>>();
  const isConnect = useRecoilValue(connectState);

  const onPress = useCallback(() => {
    navigate('Scan');
  }, [navigate]);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer} />
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text>{isConnect ? 'disconnect' : 'connect'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftContainer: {
    flex: 2,
  },
  centerContainer: {
    flex: 3,
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
