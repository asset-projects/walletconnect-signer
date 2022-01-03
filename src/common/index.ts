export const DEFAULT_MAIN_CHAINS = [
  // mainnets
  'eip155:1',
  'eip155:10',
  'eip155:100',
  'eip155:137',
  'eip155:42161',
  'eip155:42220',
];

export const DEFAULT_TEST_CHAINS = [
  // testnets
  'eip155:42',
  'eip155:69',
  'eip155:80001',
  'eip155:421611',
  'eip155:44787',
];

export const DEFAULT_CHAINS = [...DEFAULT_MAIN_CHAINS, ...DEFAULT_TEST_CHAINS];
export const DEFAULT_EIP155_METHODS = [
  'eth_sendTransaction',
  'personal_sign',
  'eth_signTypedData',
];
