import {useEffect, useState} from 'react';
import {ethers, providers, Wallet} from 'ethers';
import {useRecoilValue} from 'recoil';
import {accountState, chainDataState, sessionState} from '../recoil/atoms';
import type {ChainNamespaces} from '../types';

export const useWallet = () => {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const {privateKey} = useRecoilValue(accountState);

  useEffect(() => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      setWallet(wallet);
    } catch {
      console.log('ERROR', 'invalid privatekey');
    }
  }, [privateKey]);

  return wallet;
};

export const useWalletProvider = () => {
  const {privateKey} = useRecoilValue(accountState);
  const chainData = useRecoilValue(chainDataState);

  const getWallet = (chainId: string) => {
    const [, networkId] = chainId.split(':');
    const rpc = chainData.eip155[networkId].rpc[0];

    const wallet = new Wallet(privateKey, new providers.JsonRpcProvider(rpc));
    return wallet;
  };

  return {
    getWallet,
  };
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
    } else {
      setNetwork([]);
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
