import {useWalletConnectInitialization} from '../features/walletconnect/hooks/useWalletConnectInitialization';

export const useInitialization = () => {
  const {onWalletConnectInitialize} = useWalletConnectInitialization();

  const onInitialize = async () => {
    await onWalletConnectInitialize();
  };

  return {
    onInitialize,
  };
};
