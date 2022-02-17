import Config from 'react-native-config';
import type {SessionTypes} from '@walletconnect/types';
import {atom} from 'recoil';
import type {ChainNamespaces, SignalStateType} from '../types';
import {DEFAULT_CHAINS} from '../common';
import {CHAIN_DATA} from '../common/chainData';
import {CHAIN_JSON_RPC} from '../common/jsonRpc';

type Account = {
  // address: string;
  privateKey: string;
};

/**
 * Mock Account
 * Address: 0x3E6960ADa2cfB28B6BDA8A8bFb7923AfA89a4137
 * Private Key: 0x051b031dc6353b46e52a8bae439a7af32174e3f5c52c46b545a652013689ed2c
 */

export const accountState = atom({
  key: 'accountState',
  default: {
    privateKey:
      Config.PRIVATEKEY ??
      '0x051b031dc6353b46e52a8bae439a7af32174e3f5c52c46b545a652013689ed2c',
  } as Account,
});

export const chainsState = atom({
  key: 'chainsState',
  default: DEFAULT_CHAINS,
});

export const chainDataState = atom({
  key: 'chainDataState',
  default: CHAIN_DATA as ChainNamespaces,
});

export const jsonRpcState = atom({
  key: 'jsonRpcState',
  default: CHAIN_JSON_RPC,
});

export const sessionState = atom({
  key: 'sessionState',
  default: [] as SessionTypes.Created[],
});

export const requestListState = atom({
  key: 'requestListState',
  default: [] as SessionTypes.RequestEvent[],
});

export const signalState = atom({
  key: 'screenState',
  default: {type: 'default'} as SignalStateType,
});
