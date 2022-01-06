import {ethers, utils} from 'ethers';
import type {
  TypedDataDomain,
  TypedDataField,
} from '@ethersproject/abstract-signer';
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

  const ethSignTypedData = async (
    chainId: string,
    requestTargetAddress: string,
    param: EthSignTypedData,
  ) => {
    const wallet = getWallet(chainId);
    if (requestTargetAddress.toLowerCase() !== wallet.address.toLowerCase())
      return;

    const result = await wallet._signTypedData(
      param.domain,
      param.types,
      param.value,
    );

    return result;
  };

  const ethSign = async (
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

  const ethSignTransaction = async (
    chainId: string,
    requestTargetAddress: string,
    param: EthSendTransactionParam,
  ) => {
    const wallet = getWallet(chainId);
    if (requestTargetAddress.toLowerCase() !== wallet.address.toLowerCase())
      return;

    const {to} = param;

    const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
      to: ethers.utils.getAddress(to),
      value: ethers.utils.parseEther('0.0001'),
      gasLimit: 21000,
      maxFeePerGas: ethers.utils.parseUnits('3', 'gwei'),
      maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
    };

    const Tx = await wallet.populateTransaction(tx);
    return await wallet.signTransaction(Tx);
  };

  return {
    personalSign,
    ethSendTransaction,
    ethSignTypedData,
    ethSign,
    ethSignTransaction,
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

type EthSignTypedData = {
  domain: TypedDataDomain;
  types: Record<string, TypedDataField[]>;
  value: Record<string, any>;
};
