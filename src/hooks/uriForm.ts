import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '../navigation/stack';
import {useWalletConnectState} from '../context/client';

export const useUriForm = () => {
  const {goBack} = useNavigation<StackNavigationProp<'ConnectForm'>>();

  const {client} = useWalletConnectState();

  const [uri, setUri] = useState<string>('');

  const onSubmit = async () => {
    if (!client) {
      console.log('non client');
      return;
    }

    if (!uri.startsWith('wc:')) {
      console.log('error uri');
      return;
    }

    try {
      client.pair({uri});
      goBack();
    } catch {
      console.log('error pairing');
    }
  };

  return {
    uri,
    setUri,
    onSubmit,
  };
};
