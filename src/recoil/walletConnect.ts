import type {SessionTypes, SignClientTypes} from '@walletconnect/types';
import {atom} from 'recoil';

export const walletConnectConnectedState = atom<boolean>({
  key: 'walletConnectConnectedState',
  default: false,
});

export const walletConnectActiveSessionsState = atom<
  Record<string, SessionTypes.Struct> | undefined
>({
  key: 'walletConnectActiveSessionsState',
  default: undefined,
});

export const walletConnectPairedProposalState = atom<
  SignClientTypes.EventArguments['session_proposal']
>({
  key: 'walletConnectPairedProposalState',
  default: undefined,
});

export const walletConnectRequestSessionState = atom<SessionTypes.Struct>({
  key: 'walletConnectRequestSessionState',
  default: undefined,
});

export const walletConnectRequestEventDataState = atom<
  SignClientTypes.EventArguments['session_request']
>({
  key: 'walletConnectRequestEventDateState',
  default: undefined,
});
