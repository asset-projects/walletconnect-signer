import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {type RootStackNavigationProp} from '../navigation';

export const HomeHeader: FC = () => {
  const {navigate} = useNavigation<RootStackNavigationProp<'Home'>>();

  const onPress = () => {
    navigate('Scan');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer} />
      <View style={styles.centerContainer} />
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="scan" color={'#aaa'} size={30} />
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
