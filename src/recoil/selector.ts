import {selector} from 'recoil';
import {sessionState} from './atoms';

export const isConnectedState = selector({
  key: 'isConnectedStat',
  get: ({get}) => {
    const list = get(sessionState);

    return list.length > 0 ? true : false;
  },
});
