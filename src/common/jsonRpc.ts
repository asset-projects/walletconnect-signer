export const CHAIN_JSON_RPC = {
  methods: {
    chain: ['eth_chainId'],
    accounts: ['eth_accounts'],
    request: [
      'eth_requestAccounts',
      'wallet_addEthereumChain',
      'wallet_switchEthereumChain',
    ],
    sign: [
      'eth_sign',
      'eth_signTypedData',
      'eth_signTransaction',
      'eth_sendTransaction',
      'personal_sign',
    ],
  },
};
