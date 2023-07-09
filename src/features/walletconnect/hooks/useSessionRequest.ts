import {formatJsonRpcError, formatJsonRpcResult} from '@json-rpc-tools/utils';
import {getSdkError} from '@walletconnect/utils';
import {providers} from 'ethers';
import {useRecoilValue} from 'recoil';
import {walletState} from '../../../recoil/wallet';
import {walletConnectRequestEventDataState} from '../../../recoil/walletConnect';
import {useWalletConnectBottomSheetDispatch} from '../context/bottomSheetProvider';
import {useWalletConnectState} from '../context/walletConnectProvider';
import type {EthSendTransactionParams} from '../types';
import {
  EIP155_CHAINS,
  EIP155_SIGNING_METHODS,
  TEIP155Chain,
} from '../utils/eip155';
import {
  getSignParamsMessage,
  getSignTypedDataParamsData,
} from '../utils/helper';

export const useSessionRequest = () => {
  const {wallet} = useRecoilValue(walletState);
  const requestEventData = useRecoilValue(walletConnectRequestEventDataState);

  const {web3wallet} = useWalletConnectState();
  const {closeBottomSheet} = useWalletConnectBottomSheetDispatch();

  const {
    params: {chainId, request},
    topic,
    id,
  } = requestEventData;

  const approveRequest = async () => {
    switch (request.method) {
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
      case EIP155_SIGNING_METHODS.ETH_SIGN:
        const signedMessage = await wallet.signMessage(
          getSignParamsMessage(request.params),
        );
        return formatJsonRpcResult(id, signedMessage);

      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
        const {
          domain,
          types,
          message: data,
        } = getSignTypedDataParamsData(request.params);
        // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471
        delete types.EIP712Domain;
        const signedData = await wallet._signTypedData(domain, types, data);
        return formatJsonRpcResult(id, signedData);

      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        const provider = new providers.JsonRpcProvider(
          EIP155_CHAINS[chainId as TEIP155Chain].rpc,
        );
        const connectedWallet = wallet.connect(provider);

        const sendTransactionParams =
          request.params as EthSendTransactionParams;
        const sendTransaction = sendTransactionParams[0];
        const {hash} = await connectedWallet.sendTransaction(sendTransaction);
        return formatJsonRpcResult(id, hash);

      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
        const signTransaction = request.params[0];
        const signature = await wallet.signTransaction(signTransaction);
        return formatJsonRpcResult(id, signature);

      default:
        throw new Error(getSdkError('INVALID_METHOD').message);
    }
  };

  const onApprove = async () => {
    if (!web3wallet) {
      return;
    }

    try {
      const response = await approveRequest();
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });
      closeBottomSheet();
    } catch (e) {
      console.log('onApprove error', e);
    }
  };

  const onReject = async () => {
    if (!web3wallet) {
      return;
    }

    const response = formatJsonRpcError(
      id,
      getSdkError('USER_REJECTED_METHODS').message,
    );

    try {
      await web3wallet.respondSessionRequest({topic, response});
      closeBottomSheet();
    } catch (e) {
      console.log('onReject error', e);
    }
  };

  return {
    approveRequest,
    onApprove,
    onReject,
  };
};
