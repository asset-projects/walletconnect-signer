import {useNavigation} from '@react-navigation/native';
import {
  formatJsonRpcResult,
  formatJsonRpcError,
  JsonRpcResponse,
} from '@json-rpc-tools/utils';
import {ERROR} from '@walletconnect/utils';
import type {SessionTypes} from '@walletconnect/types';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {chainsState, requestListState, signalState} from '../recoil/atoms';
import type {StackNavigationProp} from '../navigation/stack';
import {useWalletConnectState} from '../context/client';
import {useSigner} from './signer';

export const useRequest = () => {
  const {goBack} = useNavigation<StackNavigationProp<'Request'>>();

  const {client} = useWalletConnectState();
  const chains = useRecoilValue(chainsState);
  const signalValues = useRecoilValue(signalState);
  const [requests, setRequests] = useRecoilState(requestListState);
  const resetSignalValues = useResetRecoilState(signalState);

  const {personalSign, ethSendTransaction} = useSigner();

  const removeFromPending = async (requestEvent: SessionTypes.RequestEvent) => {
    setRequests(requests.filter(x => x.request.id !== requestEvent.request.id));
  };

  const approveRequest = async () => {
    if (!client) return;
    if (signalValues.type !== 'request') return;

    const {requestEvent} = signalValues.data;
    const chainId = requestEvent.chainId || chains[0];

    try {
      if (requestEvent.request.method === 'personal_sign') {
        const [message, address] = requestEvent.request.params;

        const result = await personalSign(chainId, address, message);
        const response = formatJsonRpcResult(requestEvent.request.id, result);
        client.respond({
          topic: requestEvent.topic,
          response,
        });
      } else if (requestEvent.request.method === 'eth_signTypedData') {
        //
      } else if (requestEvent.request.method === 'eth_sendTransaction') {
        const param = requestEvent.request.params;
        if (!param.length) {
          return console.log('ERROR', 'empty Parameter');
        }

        const result = await ethSendTransaction(chainId, param[0]);
        const response = formatJsonRpcResult(requestEvent.request.id, result);
        client.respond({
          topic: requestEvent.topic,
          response,
        });
      }
    } catch (e: any) {
      console.log(
        'Error',
        'Approve Request',
        `method: ${requestEvent.request.method}`,
        e,
      );

      const message = e.message ?? undefined;

      const response = formatJsonRpcError(requestEvent.request.id, message);
      client.respond({topic: requestEvent.topic, response});
    } finally {
      goBack();
      removeFromPending(requestEvent);
      resetSignalValues();
    }
  };

  const rejectRequest = async () => {
    if (!client) return;
    if (signalValues.type !== 'request') return;

    const {requestEvent} = signalValues.data;
    const error = ERROR.JSONRPC_REQUEST_METHOD_REJECTED.format();

    try {
      await client.respond({
        topic: requestEvent.topic,
        response: {
          id: requestEvent.request.id,
          jsonrpc: requestEvent.request.jsonrpc,
          error,
        },
      });
    } catch {
      console.log(
        'ERROR',
        'reject Request',
        `method: ${requestEvent.request.method}`,
      );
    } finally {
      goBack();
      removeFromPending(requestEvent);
      resetSignalValues();
    }
  };

  return {
    approveRequest,
    rejectRequest,
  };
};
