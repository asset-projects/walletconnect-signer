import {useEffect, useState} from 'react';
import {useWalletConnectState} from '../context/client';

export const useWalletConnectHandler = () => {
  const {client} = useWalletConnectState();

  const [uri, setUri] = useState<string | undefined>();

  useEffect(() => {
    setUri('');
  }, []);

  const pairing = async () => {
    if (!client) {
      console.log('non client');
      return;
    }

    if (!uri) {
      console.log('empty uri');
      return;
    }

    if (!uri.startsWith('wc:')) {
      console.log('error uri');
      return;
    }

    try {
      client.pair({uri});
    } catch {
      console.log('error pair');
    }
  };

  return {
    pairing,
  };
};
