import {ethers, utils} from 'ethers';
import {useWalletProvider} from './wallet';

export const useSigner = () => {
  const {getWallet} = useWalletProvider();

  const personalSign = async (
    chainId: string,
    requestTargetAddress: string,
    message: string,
  ) => {
    const wallet = getWallet(chainId);

    if (requestTargetAddress.toLowerCase() !== wallet.address.toLowerCase())
      return;

    const hex = utils.isHexString(message) ? utils.arrayify(message) : message;
    return await wallet.signMessage(hex);
  };

  const ethSendTransaction = async (
    chainId: string,
    param: EthSendTransactionParam,
  ) => {
    const wallet = getWallet(chainId);

    const {to} = param;

    const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
      to: ethers.utils.getAddress(to),
      value: ethers.utils.parseEther('0.0001'),
      gasLimit: 21000,
      maxFeePerGas: ethers.utils.parseUnits('3', 'gwei'),
      maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
    };

    const result = await wallet.sendTransaction(tx);
    return result.hash;
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
