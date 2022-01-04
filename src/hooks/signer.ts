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

  const ethSendTransaction = async (param: EthSendTransactionParam) => {
    if (!wallet) return;

    const _tx = await wallet.populateTransaction(param);
    const tx = await wallet.sendTransaction(_tx);
    return tx.hash;
  };

  // const ethSignTypedData = async (requestTargetAddress: string) => {
  //   if (!wallet) return;
  //   if (requestTargetAddress.toLowerCase() !== wallet.address.toLowerCase())
  //     return;

  //   const domain = {};
  // };

  return {
    personalSign,
    ethSendTransaction,
  };
};

type EthSendTransactionParam = {
  from: string;
  to: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  data: string;
};
