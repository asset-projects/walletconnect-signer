import {utils} from 'ethers';
import {useWalletState} from '../context/wallet';

export const useSigner = () => {
  const {wallet} = useWalletState();

  const personalSign = async (
    requestTargetAddress: string,
    message: string,
  ) => {
    if (!wallet) return;
    if (requestTargetAddress.toLowerCase() !== wallet.address.toLowerCase())
      return;

    const hex = utils.isHexString(message) ? utils.arrayify(message) : message;
    return await wallet.signMessage(hex);
  };

  return {
    personalSign,
  };
};
