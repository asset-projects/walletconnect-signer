import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {accountState, chainDataState, sessionState} from '../recoil/atoms';
import type {ChainNamespaces} from '../types';

export const useWallet = () => {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const {privateKey} = useRecoilValue(accountState);

  useEffect(() => {
    const wallet = new ethers.Wallet(privateKey);
    setWallet(wallet);
  }, [privateKey]);

  return wallet;
};

export const useConnectNetwork = () => {
  const chainData = useRecoilValue(chainDataState);
  const sessionList = useRecoilValue(sessionState);

  const [network, setNetwork] = useState<string[]>([]);

  useEffect(() => {
    if (sessionList.length) {
      const newList: string[] = [];
      for (const item of sessionList[0].permissions.blockchain.chains) {
        newList.push(getChainName(item, chainData));
      }

      setNetwork([...newList]);
    }
  }, [chainData, sessionList]);

  return network;
};

export const getChainName = (
  chain: string,
  chainData: ChainNamespaces,
): string => {
  const chainId = chain.replace('eip155:', '');
  return chainData.eip155[chainId] ? chainData.eip155[chainId].name : '';
};
