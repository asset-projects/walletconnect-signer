export type EthSendTransactionParams = {
  from: string;
  to: string;
  nonce: string;
  value: string;
  data: string;
  gasLimit: string;
  gasPrice: string;
}[];
