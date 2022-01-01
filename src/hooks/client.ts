import {useEffect, useState} from 'react';
import WalletConnectClient from '@walletconnect/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWalletConnectClient = () => {
  const [state, setState] = useState<WalletConnectClient | null>(null);

  useEffect(() => {
    (async () => {
      const client = await WalletConnectClient.init({
        controller: true,
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: '40551de2a7959b52dabac22f268a1791',
        metadata: {
          name: 'Test Wallet',
          description: 'Test Wallet',
          url: '#',
          icons: ['https://avatars.githubusercontent.com/u/46671838?s=200&v=4'],
        },
        logger: '',
        storageOptions: {
          asyncStorage: AsyncStorage as any,
        },
      });

      setState(client);
    })();
  }, []);

  return {
    client: state,
  };
};
