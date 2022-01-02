import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {accountState} from '../recoil/atoms';

export const useWallet = () => {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const {privateKey} = useRecoilValue(accountState);

  useEffect(() => {
    const wallet = new ethers.Wallet(privateKey);
    setWallet(wallet);
  }, [privateKey]);

  return wallet;
};
