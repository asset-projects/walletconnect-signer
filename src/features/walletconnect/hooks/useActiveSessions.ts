import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {
  walletConnectActiveSessionsState,
  walletConnectConnectedState,
} from '../../../recoil/walletConnect';
import {isEmptyObject} from '../../../utils/commons';
import {useWalletConnectState} from '../context/walletConnectProvider';

export const useActiveSessions = () => {
  const {web3wallet} = useWalletConnectState();

  const setIsConnected = useSetRecoilState(walletConnectConnectedState);
  const setActiveSessions = useSetRecoilState(walletConnectActiveSessionsState);

  useEffect(() => {
    if (web3wallet) {
      const activeSessions = web3wallet.getActiveSessions();
      if (!isEmptyObject(activeSessions as Object)) {
        setActiveSessions(activeSessions);
        setIsConnected(true);
      }
    }
  }, [web3wallet]);
};
