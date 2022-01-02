import {useEffect, useState} from 'react';
import {CLIENT_EVENTS} from '@walletconnect/client';
import type {SessionTypes} from '@walletconnect/types';
import {useWalletConnectState} from '../context/client';

export const useSubscribeWalletConnectEffect = () => {
  const {client} = useWalletConnectState();
  const [isReady, setIsReady] = useState<boolean>(true);

  const handleSessionUserApproval = async (
    approved: boolean,
    proposal: SessionTypes.Proposal,
  ) => {
    if (!client) {
      return;
    }

    await client.approve({
      proposal,
      response: {
        state: {
          accounts: ['eip155:42:0x1d85568eEAbad713fBB5293B45ea066e552A90De'],
        },
      },
    });
  };

  useEffect(() => {
    if (client && isReady) {
      setIsReady(false);

      client.on(
        CLIENT_EVENTS.session.proposal,
        async (proposal: SessionTypes.Proposal) => {
          // user should be prompted to approve the proposed session permissions displaying also dapp metadata
          const {proposer, permissions} = proposal;
          const {metadata} = proposer;
          let approved: boolean = false;
          handleSessionUserApproval(approved, proposal); // described in the step 4
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
