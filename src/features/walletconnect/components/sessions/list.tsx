import {useNavigation} from '@react-navigation/native';
import type {SessionTypes} from '@walletconnect/types';
import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import type {RootStackNavigationProp} from '../../../../navigation';
import {WalletConnectSession} from './listItem';

const keyExtractor = (item: SessionTypes.Struct) => item.topic;

type Props = {
  data: SessionTypes.Struct[];
};

export function WalletConnectSessionList({data}: Props): React.JSX.Element {
  const {navigate} = useNavigation<RootStackNavigationProp<'Home'>>();

  const renderItem = useCallback(
    ({item}: {item: SessionTypes.Struct}) => {
      const onPress = () => {
        navigate('WalletConnectSession', {topic: item.topic});
      };

      return <WalletConnectSession data={item} onPress={onPress} />;
    },
    [navigate],
  );

  return (
    <FlatList data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
  );
}
