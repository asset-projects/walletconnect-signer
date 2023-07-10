import {ethers} from 'ethers';
import {atom, selector} from 'recoil';
import {MOCK_WALLET} from '../assets';

export const walletMnemonicState = atom({
  key: 'walletMnemonicState',
  default: MOCK_WALLET.mnemonic,
});

export const walletState = selector({
  key: 'walletState',
  get: ({get}) => {
    const mnemonic = get(walletMnemonicState);
    if (
      mnemonic.phrase === MOCK_WALLET.mnemonic.phrase &&
      mnemonic.path === MOCK_WALLET.mnemonic.path
    ) {
      const wallet = ethers.Wallet.fromMnemonic(
        MOCK_WALLET.mnemonic.phrase,
        MOCK_WALLET.mnemonic.path,
      );
      return {
        wallet,
        ...MOCK_WALLET,
      };
    }

    const wallet = ethers.Wallet.fromMnemonic(mnemonic.phrase, mnemonic.path);
    return {
      wallet,
      address: wallet.address,
      privatekey: wallet.privateKey,
      mnemonic: wallet.mnemonic,
    };
  },
});
