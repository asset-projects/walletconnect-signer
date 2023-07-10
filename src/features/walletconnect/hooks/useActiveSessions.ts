import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {walletConnectConnectedState} from '../../../recoil/walletConnect';
import {isEmptyObject} from '../../../utils/commons';
import {useWalletConnectState} from '../context/walletConnectProvider';

export const useActiveSessions = () => {
  const {web3wallet} = useWalletConnectState();
  const setIsConnected = useSetRecoilState(walletConnectConnectedState);

  useEffect(() => {
    if (web3wallet) {
      const activeSessions = web3wallet.getActiveSessions();
      !isEmptyObject(activeSessions as Object) && setIsConnected(true);
    }
  }, [setIsConnected, web3wallet]);
};
