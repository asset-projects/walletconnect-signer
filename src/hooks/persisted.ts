import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {requestListState, sessionState} from '../recoil/atoms';
import {useWalletConnectState} from '../context/client';

export const useCheckPersistedEffect = () => {
  const {client} = useWalletConnectState();
  const setSessions = useSetRecoilState(sessionState);
  const setRequests = useSetRecoilState(requestListState);

  useEffect(() => {
    (async () => {
      if (client) {
        console.log('ACTION', 'checkPersisted');

        setRequests([...client.session.history.pending]);
        setSessions([...client.session.values]);
      }
    })();
  }, [client]);
};
