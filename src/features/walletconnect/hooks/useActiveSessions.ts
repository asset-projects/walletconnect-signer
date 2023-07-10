import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {walletConnectConnectedState} from '../../../recoil/walletConnect';
import {useWalletConnectState} from '../context/walletConnectProvider';

export const useActiveSessions = () => {
  const {web3wallet} = useWalletConnectState();
  const setIsConnected = useSetRecoilState(walletConnectConnectedState);

  useEffect(() => {
    if (web3wallet) {
      const activeSessions = web3wallet?.getActiveSessions();
      activeSessions && setIsConnected(true);
    }
  }, [setIsConnected, web3wallet]);
};
