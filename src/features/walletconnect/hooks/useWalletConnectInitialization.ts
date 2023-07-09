import {useWalletConnectDispatch} from '../context/walletConnectProvider';

export const useWalletConnectInitialization = () => {
  const {createWeb3Wallet} = useWalletConnectDispatch();

  const onWalletConnectInitialize = async () => {
    try {
      await createWeb3Wallet();
      console.log('Web3Wallet initialized');
    } catch (error) {
      console.log('Error for initializing', error);
    }
  };

  return {
    onWalletConnectInitialize,
  };
};
