import {useEffect, useState} from 'react';
import WalletConnectClient from '@walletconnect/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Args = {
  debug?: boolean;
};

export const useWalletConnectClient = (args?: Args) => {
  const [state, setState] = useState<WalletConnectClient | null>(null);

  useEffect(() => {
    if (state === null) {
      (async () => {
        try {
          const client = await WalletConnectClient.init({
            controller: true,
            relayUrl: 'wss://relay.walletconnect.com',
            projectId: '',
            logger: args?.debug ? 'debug' : undefined,
            metadata: {
              name: 'Test Wallet',
              description: 'Test Wallet',
              url: '#',
              icons: ['https://walletconnect.com/walletconnect-logo.png'],
            },
            storageOptions: {
              asyncStorage: AsyncStorage as any,
            },
          });

          setState(client);
          console.log('set client ok');
        } catch {
          console.log('error set client');
        }
      })();
    }
  }, [state]);

  return state;
};
