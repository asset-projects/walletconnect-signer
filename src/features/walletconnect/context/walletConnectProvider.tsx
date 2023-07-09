import {Core} from '@walletconnect/core';
import {ICore, PairingTypes} from '@walletconnect/types';
import {Web3Wallet, IWeb3Wallet} from '@walletconnect/web3wallet';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import Config from 'react-native-config';

type State = {
  web3wallet?: IWeb3Wallet;
  walletConnectCore?: ICore;
};

type Action = {
  type: 'SET_WEB3WALLET';
  payload: {
    web3wallet: IWeb3Wallet;
    walletConnectCore: ICore;
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_WEB3WALLET':
      return {
        ...state,
        web3wallet: action.payload.web3wallet,
        walletConnectCore: action.payload.walletConnectCore,
      };
    default:
      return state;
  }
};

const StateContext = createContext<State>({});
const DispatcherContext = createContext<{
  createWeb3Wallet: () => Promise<void>;
  pair: (params: {uri: string}) => Promise<false | PairingTypes.Struct>;
}>({
  createWeb3Wallet: async () => {},
  pair: async () => false,
});

type Props = {};

export const WalletConnectProvider: FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {});

  const createWeb3Wallet = async () => {
    const walletConnectCore = new Core({
      // @notice: If you want the debugger / logs
      // logger: 'debug',
      projectId: Config.WALLET_CONNECT_PROJECT_ID,
    });

    const web3wallet = await Web3Wallet.init({
      core: walletConnectCore,
      metadata: {
        name: 'React Native Web3Wallet',
        description: 'ReactNative Web3Wallet',
        url: 'https://walletconnect.com/',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
    });

    dispatch({
      type: 'SET_WEB3WALLET',
      payload: {walletConnectCore, web3wallet},
    });
  };

  const pair = async (params: {uri: string}) => {
    if (!state.walletConnectCore) {
      return false;
    }

    return await state.walletConnectCore.pairing.pair(params);
  };

  return (
    <StateContext.Provider value={state}>
      <DispatcherContext.Provider value={{createWeb3Wallet, pair}}>
        {children}
      </DispatcherContext.Provider>
    </StateContext.Provider>
  );
};

export const useWalletConnectState = () => useContext(StateContext);
export const useWalletConnectDispatch = () => useContext(DispatcherContext);
