import type {SignClientTypes} from '@walletconnect/types';
import {useCallback, useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {
  walletConnectPairedProposalState,
  walletConnectRequestEventDataState,
  walletConnectRequestSessionState,
} from '../../../recoil/walletConnect';
import {useWalletConnectState} from '../context/walletConnectProvider';
import {
  useWalletConnectBottomSheetDispatch,
  useWalletConnectBottomSheetState,
} from '../context/bottomSheetProvider';
import {EIP155_SIGNING_METHODS} from '../utils/eip155';

export const useWalletConnectEffects = () => {
  const {web3wallet} = useWalletConnectState();
  const {bottomSheetType} = useWalletConnectBottomSheetState();
  const {openBottomSheet} = useWalletConnectBottomSheetDispatch();

  const setPairedProposal = useSetRecoilState(walletConnectPairedProposalState);
  const setRequestSession = useSetRecoilState(walletConnectRequestSessionState);
  const setRequestEventData = useSetRecoilState(
    walletConnectRequestEventDataState,
  );

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      console.log('onSessionProposal');

      setPairedProposal(proposal);
      openBottomSheet('approval');
    },
    [openBottomSheet, setPairedProposal],
  );

  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      if (!web3wallet) {
        console.log('web3wallet is not initialized');
        return;
      }

      const {
        topic,
        params: {request},
      } = requestEvent;
      const requestSessionData =
        web3wallet.engine.signClient.session.get(topic);

      console.log('onSessionRequest');

      setRequestSession(requestSessionData);
      setRequestEventData(requestEvent);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          return openBottomSheet('sign');

        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          return openBottomSheet('signTypedData');

        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          return openBottomSheet('sendTransaction');
      }
    },
    [openBottomSheet, setRequestEventData, setRequestSession, web3wallet],
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (web3wallet && bottomSheetType && !isMounted) {
      setIsMounted(true);
      web3wallet.on('session_proposal', onSessionProposal);
      web3wallet.on('session_request', onSessionRequest);
    }
  }, [
    isMounted,
    bottomSheetType,
    onSessionProposal,
    onSessionRequest,
    web3wallet,
  ]);
};
