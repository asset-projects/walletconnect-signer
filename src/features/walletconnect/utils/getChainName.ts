import {EIP155_CHAINS_BY_ID} from './eip155';

export const getChainName = (eip155ChainId: string) => {
  const chainId = eip155ChainId.split(':')[1];

  if (!chainId) {
    return 'UnSupported Chain';
  }

  const chain = EIP155_CHAINS_BY_ID[chainId];

  if (!chain) {
    return 'UnSupported Chain';
  }

  return chain.name;
};
