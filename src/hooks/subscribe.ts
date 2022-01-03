import {useEffect, useState} from 'react';
import {CLIENT_EVENTS} from '@walletconnect/client';
import type {SessionTypes} from '@walletconnect/types';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {chainsState, jsonRpcState, signalState} from '../recoil/atoms';
import {useWalletState} from '../context/wallet';
import {useWalletConnectState} from '../context/client';
import {DEFAULT_EIP155_METHODS} from '../common';

export const useSubscribeWalletConnectEffect = () => {
  const {wallet} = useWalletState();
  const {client} = useWalletConnectState();

  const chains = useRecoilValue(chainsState);
  const jsonRpc = useRecoilValue(jsonRpcState);
  const setSignalState = useSetRecoilState(signalState);

  const [isReady, setIsReady] = useState<boolean>(true);

  useEffect(() => {
    if (client && isReady) {
      setIsReady(false);

      client.on(
        CLIENT_EVENTS.session.proposal,
        async (proposal: SessionTypes.Proposal) => {
          console.log('EVENT', 'session_proposal');

          const {
            proposer,
            permissions: {blockchain, jsonrpc},
          } = proposal;

          const supportedNamespaces: string[] = [];

          chains.forEach(chainId => {
            const [namespace] = chainId.split(':');
            if (!supportedNamespaces.includes(namespace)) {
              supportedNamespaces.push(namespace);
            }
          });

          const unsupportedChains: string[] = [];
          blockchain.chains.forEach(chainId => {
            if (chains.includes(chainId)) return;

            unsupportedChains.push(chainId);
          });

          if (unsupportedChains.length) {
            console.log('ERROR', 'unsupported chains.');
            client.reject({proposal});
            return;
          }

          const unsupportedMethods: string[] = [];
          jsonrpc.methods.forEach(method => {
            if (
              supportedNamespaces.includes('eip155') &&
              DEFAULT_EIP155_METHODS.includes(method)
            ) {
              return;
            }

            unsupportedMethods.push(method);
          });

          if (unsupportedMethods.length) {
            console.log('ERROR', 'There are unsupported methods.');
            client.reject({proposal});
            return;
          }

          setSignalState({type: 'proposal', data: {proposal}});
        },
      );

      client.on(
        CLIENT_EVENTS.session.created,
        async (session: SessionTypes.Created) => {
          console.log('EVENT', 'session_created');

          console.log('created', {session});
        },
      );

      client.on(CLIENT_EVENTS.session.deleted, async (session: any) => {
        console.log('EVENT', 'session_deleted');

        console.log('deleted', {session});
      });
    }
  }, [client]);
};
