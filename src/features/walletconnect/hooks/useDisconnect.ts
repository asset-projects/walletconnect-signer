import {getSdkError} from '@walletconnect/utils';
import {useResetRecoilState} from 'recoil';
import {
  walletConnectActiveSessionsState,
  walletConnectConnectedState,
} from '../../../recoil/walletConnect';
import {isEmptyObject} from '../../../utils/commons';
import {useWalletConnectState} from '../context/walletConnectProvider';

export const useDisconnect = () => {
  const {web3wallet} = useWalletConnectState();
  const resetIsWalletConnectConnected = useResetRecoilState(
    walletConnectConnectedState,
  );
  const resetWalletConnectActiveSessions = useResetRecoilState(
    walletConnectActiveSessionsState,
  );

  const disconnect = async (topic: string, callback?: () => void) => {
    try {
      await web3wallet?.disconnectSession({
        topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });

      const _activeSessions = web3wallet?.getActiveSessions();

      if (_activeSessions && isEmptyObject(_activeSessions)) {
        resetWalletConnectActiveSessions();
        resetIsWalletConnectConnected();
      }

      callback && callback();
    } catch (e) {
      console.log('Error disconnecting session', e);
    }
  };

  return {
    disconnect,
  };
};
