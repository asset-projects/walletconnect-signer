import React, {createContext, useContext} from 'react';
import WalletConnectClient from '@walletconnect/client';
import {useWalletConnectClient} from '../hooks/client';

const StateContext = createContext<{client: WalletConnectClient | null}>({
  client: null,
});

type Props = {
  children: React.ReactChild;
  debug?: boolean;
};

const Context: React.VFC<Props> = ({children, debug}) => {
  const client = useWalletConnectClient({debug});

  return (
    <StateContext.Provider value={{client}}>{children}</StateContext.Provider>
  );
};

export const WCClientContext = Context;

export const useWalletConnectState = () => useContext(StateContext);
