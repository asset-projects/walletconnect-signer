import type {SessionTypes} from '@walletconnect/types';
import {getSdkError} from '@walletconnect/utils';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {walletState} from '../../../recoil/wallet';
import {
  walletConnectActiveSessionsState,
  walletConnectConnectedState,
  walletConnectPairedProposalState,
} from '../../../recoil/walletConnect';
import {isEmptyObject} from '../../../utils/commons';
import {useWalletConnectBottomSheetDispatch} from '../context/bottomSheetProvider';
import {useWalletConnectState} from '../context/walletConnectProvider';

export const useSessionProposal = () => {
  const wallet = useRecoilValue(walletState);
  const pairedProposal = useRecoilValue(walletConnectPairedProposalState);
  const setIsConnected = useSetRecoilState(walletConnectConnectedState);
  const setActiveSessions = useSetRecoilState(walletConnectActiveSessionsState);

  const {web3wallet} = useWalletConnectState();

  const {closeBottomSheet} = useWalletConnectBottomSheetDispatch();

  const onAccept = async () => {
    if (!pairedProposal || !web3wallet) {
      return;
    }

    const {id, params} = pairedProposal;
    const {requiredNamespaces, relays} = params;

    const namespaces: SessionTypes.Namespaces = {};
    Object.keys(requiredNamespaces).forEach(key => {
      const accounts: string[] = [];

      requiredNamespaces[key].chains?.map(chain => {
        [wallet.address].map(acc => accounts.push(`${chain}:${acc}`));
      });

      namespaces[key] = {
        accounts,
        methods: requiredNamespaces[key].methods,
        events: requiredNamespaces[key].events,
      };
    });

    await web3wallet.approveSession({
      id,
      relayProtocol: relays[0].protocol,
      namespaces,
    });

    const activeSessions = web3wallet.getActiveSessions();
    !isEmptyObject(activeSessions) && setActiveSessions(activeSessions);

    setIsConnected(true);
    closeBottomSheet();
  };

  const onDecline = async () => {
    closeBottomSheet();

    if (!pairedProposal || !web3wallet) {
      return;
    }

    web3wallet.rejectSession({
      id: pairedProposal.id,
      reason: getSdkError('USER_REJECTED_METHODS'),
    });
  };

  return {
    onAccept,
    onDecline,
  };
};
