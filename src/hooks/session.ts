import {ERROR} from '@walletconnect/utils';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {sessionState, signalState} from '../recoil/atoms';
import {useWalletState} from '../context/wallet';
import {useWalletConnectState} from '../context/client';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '../navigation/stack';

export const useSession = () => {
  const {goBack} = useNavigation<StackNavigationProp<'Proposal'>>();

  const {wallet} = useWalletState();
  const {client} = useWalletConnectState();
  const signalValues = useRecoilValue(signalState);
  const sessionValues = useRecoilValue(sessionState);

  const setSessionsValue = useSetRecoilState(sessionState);
  const resetSignalValue = useResetRecoilState(signalState);

  const approveSession = async () => {
    if (!client) return;
    if (!wallet) return;
    if (signalValues.type !== 'proposal') {
      console.log(
        'ERROR',
        'The status of the screen is different from "proposal".',
      );
      return;
    }

    if (!signalValues.data || !signalValues.data.proposal) {
      console.log('ERROR', 'The proposal does not exist.');
      return;
    }
    const proposal = signalValues.data.proposal;

    if (!proposal.permissions.blockchain.chains.length) {
      return;
    }

    const accounts = [
      `${proposal.permissions.blockchain.chains[0]}:${wallet.address}`,
    ];
    const session = await client.approve({
      proposal,
      response: {state: {accounts}},
    });

    console.log('ACTION', 'approveSession');

    setSessionsValue([session]);
    resetSignalValue();

    goBack();
  };

  const rejectSession = async () => {
    if (!client) return;

    if (signalValues.type !== 'proposal') {
      console.log(
        'ERROR',
        'The status of the screen is different from "proposal".',
      );
      return;
    }

    const proposal = signalValues.data.proposal;
    try {
      await client.reject({proposal});
      console.log('ACTION', 'rejectSession');
    } catch {
      console.log('ERROR', 'rejectSession');
    } finally {
      goBack();
      resetSignalValue();
    }
  };

  const disconnect = async () => {
    if (!client) return;
    if (!sessionValues.length) return;

    try {
      await client.disconnect({
        topic: sessionValues[0].topic,
        reason: ERROR.USER_DISCONNECTED.format(),
      });
      console.log('ACTION', 'disconnect');
    } catch {
      console.log('ERROR', 'disconnect');
    }
  };

  const ping = async () => {
    if (!client) return;
    if (!sessionValues.length) return;

    try {
      await client.ping({
        topic: sessionValues[0].topic,
      });
      console.log('Successful Session Ping');
    } catch {
      console.log('not connected');
    }
  };

  return {
    approveSession,
    rejectSession,
    disconnect,
    ping,
  };
};
