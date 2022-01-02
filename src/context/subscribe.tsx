import React from 'react';
import {useSubscribeWalletConnectEffect} from '../hooks/subscribe';

type Props = {
  children: React.ReactChild;
};

export const SubscribeContext: React.VFC<Props> = ({children}) => {
  useSubscribeWalletConnectEffect();

  return <>{children}</>;
};
