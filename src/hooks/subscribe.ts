import WalletConnectClient, {CLIENT_EVENTS} from '@walletconnect/client';
import {SessionTypes} from '@walletconnect/types';
import {useEffect, useState} from 'react';

export const useSubscribeWalletConnectEffect = (
  client: WalletConnectClient | null,
) => {
  const [isReady, setIsReady] = useState<boolean>(true);

  useEffect(() => {
    if (client && isReady) {
      setIsReady(false);

      client.on(
        CLIENT_EVENTS.session.proposal,
        async (proposal: SessionTypes.Proposal) => {
          // user should be prompted to approve the proposed session permissions displaying also dapp metadata
          const {proposer, permissions} = proposal;
          const {metadata} = proposer;
          let approved: boolean;
          // handleSessionUserApproval(approved, proposal); // described in the step 4
        },
      );

      client.on(
        CLIENT_EVENTS.session.created,
        async (session: SessionTypes.Created) => {
          // session created succesfully
        },
      );
    }
  }, [client]);
};
