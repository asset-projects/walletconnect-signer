import {atom} from 'recoil';

type Account = {
  address: string;
  privateKey: string;
};

/**
 * Mock Account
 * Address: 0x3E6960ADa2cfB28B6BDA8A8bFb7923AfA89a4137
 * Private Key: 0x051b031dc6353b46e52a8bae439a7af32174e3f5c52c46b545a652013689ed2c
 */

export const accountState = atom({
  key: 'accountState',
  default: {
    address: '0x3E6960ADa2cfB28B6BDA8A8bFb7923AfA89a4137',
    privateKey:
      '0x051b031dc6353b46e52a8bae439a7af32174e3f5c52c46b545a652013689ed2c',
  } as Account,
});
