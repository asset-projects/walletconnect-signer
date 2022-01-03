import type {SessionTypes} from '@walletconnect/types';

export interface ChainData {
  name: string;
  id: string;
  rpc: string[];
  slip44: number;
  testnet: boolean;
}

export interface ChainsMap {
  [reference: string]: ChainData;
}

export interface ChainNamespaces {
  [namespace: string]: ChainsMap;
}

export type SignalStateType =
  | {
      type: 'default';
    }
  | {
      type: 'proposal';
      data: {
        proposal: SessionTypes.Proposal;
      };
    }
  | {
      type: 'request';
      data: {
        requestEvent: SessionTypes.RequestEvent;
        peer: SessionTypes.Participant;
      };
    };
