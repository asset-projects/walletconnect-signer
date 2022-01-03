import {useEffect, useState} from 'react';
import {useWalletConnectState} from '../context/client';

const t =
  'wc:863628ef7725312b74f8aba5c29828657b984c464fd10114bd20ab249eb356f7@2?controller=false&publicKey=3f7ecf6875b44da3bd0db67913936a5ad4d2dae95cb82e2daf6ade6f4055a12f&relay=%7B%22protocol%22%3A%22waku%22%7D';

export const useWalletConnectHandler = () => {
  const {client} = useWalletConnectState();

  const [uri, setUri] = useState<string>('');

  useEffect(() => {
    setUri(t);
  }, []);

  const pairing = async () => {
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
    } catch {
      console.log('error pair');
    }
  };

  return {
    uri,
    setUri,
    pairing,
  };
};
