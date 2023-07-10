import {Core} from '@walletconnect/core';
import type {ICore, PairingTypes} from '@walletconnect/types';
import {Web3Wallet, type IWeb3Wallet} from '@walletconnect/web3wallet';
import React, {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import Config from 'react-native-config';
import {metadata} from '../../../assets';
import {useActiveSessions} from '../hooks/useActiveSessions';
import {useSessionEffects} from '../hooks/useSessionEffects';
import {WalletConnectBottomSheetProvider} from './bottomSheetProvider';
import {WalletConnectBottomSheet} from '../components/bottomSheet';

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
        name: metadata.name,
        description: metadata.description,
        url: metadata.url,
        icons: metadata.icons,
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
        <WalletConnectBottomSheetProvider>
          <Main>{children}</Main>
        </WalletConnectBottomSheetProvider>
      </DispatcherContext.Provider>
    </StateContext.Provider>
  );
};

const Main: FC<PropsWithChildren<{}>> = ({children}) => {
  useSessionEffects();
  useActiveSessions();

  return (
    <>
      {children}
      <WalletConnectBottomSheet />
    </>
  );
};

export const useWalletConnectState = () => useContext(StateContext);
export const useWalletConnectDispatch = () => useContext(DispatcherContext);
