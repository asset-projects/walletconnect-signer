import {useCallback, useEffect, useState} from 'react';
import {CLIENT_EVENTS} from '@walletconnect/client';
import {formatJsonRpcError, JsonRpcResponse} from '@json-rpc-tools/utils';
import type {SessionTypes} from '@walletconnect/types';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  chainsState,
  jsonRpcState,
  requestListState,
  sessionState,
  signalState,
} from '../recoil/atoms';
import {useWalletConnectState} from '../context/client';
import {DEFAULT_EIP155_METHODS} from '../common';

export const useSubscribeWalletConnectEffect = () => {
  const {client} = useWalletConnectState();

  const chains = useRecoilValue(chainsState);
  const jsonRpc = useRecoilValue(jsonRpcState);
  const setSignalState = useSetRecoilState(signalState);
  const setSessionState = useSetRecoilState(sessionState);
  const setRequestState = useSetRecoilState(requestListState);

  const respondRequest = useCallback(
    async (topic: string, response: JsonRpcResponse) => {
      if (!client) return;

      await client.respond({topic, response});
    },
    [client],
  );

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
        CLIENT_EVENTS.session.request,
        async (requestEvent: SessionTypes.RequestEvent) => {
          console.log('EVENT', 'session_request', requestEvent.request);

          // const chainId = requestEvent.chainId || chains[0];
          // const [namespace, networkId] = chainId.split(':');

          try {
            const requiresApproval = jsonRpc.methods.sign.includes(
              requestEvent.request.method,
            );

            if (requiresApproval) {
              const {peer} = await client.session.get(requestEvent.topic);
              setRequestState(prev => [...prev, requestEvent]);
              setSignalState({type: 'request', data: {requestEvent, peer}});
            } else {
              console.log('ERROR', 'requireApprove');
            }
          } catch (e: any) {
            console.log(e);

            const message = e.message ?? undefined;
            const response = formatJsonRpcError(
              requestEvent.request.id,
              message,
            );
            await respondRequest(requestEvent.topic, response);
          }
        },
      );

      client.on(
        CLIENT_EVENTS.session.created,
        async (session: SessionTypes.Created) => {
          console.log('EVENT', 'session_created');

          console.log('created', {session});
          setSessionState(client.session.values);
        },
      );

      client.on(CLIENT_EVENTS.session.deleted, async (session: any) => {
        console.log('EVENT', 'session_deleted');

        console.log('deleted', {session});
        setSessionState(client.session.values);
      });
    }
  }, [client]);
};
