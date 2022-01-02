import {ethers} from 'ethers';
import React, {createContext} from 'react';
import {useWallet} from '../hooks/wallet';

const WalletStateContext = createContext<{wallet: ethers.Wallet | null}>({
  wallet: null,
});

type Props = {
  children: React.ReactChild;
};

export const WalletContext: React.VFC<Props> = ({children}) => {
  const wallet = useWallet();

  return (
    <WalletStateContext.Provider value={{wallet}}>
      {children}
    </WalletStateContext.Provider>
  );
};
