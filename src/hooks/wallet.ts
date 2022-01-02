import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {accountState} from '../recoil/atoms';

export const useWallet = () => {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const {address, privateKey} = useRecoilValue(accountState);
  const setAccountValues = useSetRecoilState(accountState);

  useEffect(() => {
    const wallet = new ethers.Wallet(privateKey);
    setWallet(wallet);

    if (wallet.address !== address) {
      setAccountValues(prev => ({
        ...prev,
        address: wallet.address,
      }));
    }
  }, [privateKey]);

  return wallet;
};
