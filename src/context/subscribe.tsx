import React from 'react';
import {useCheckPersistedEffect} from '../hooks/persisted';
import {useSubscribeWalletConnectEffect} from '../hooks/subscribe';

type Props = {
  children: React.ReactChild;
};

export const SubscribeContext: React.VFC<Props> = ({children}) => {
  useSubscribeWalletConnectEffect();
  useCheckPersistedEffect();

  return <>{children}</>;
};
