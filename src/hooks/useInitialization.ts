import {useWalletConnectInitialization} from '../features/walletconnect';

export const useInitialization = () => {
  const {onWalletConnectInitialize} = useWalletConnectInitialization();

  const onInitialize = async () => {
    await onWalletConnectInitialize();
  };

  return {
    onInitialize,
  };
};
