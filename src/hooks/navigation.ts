import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {signalState} from '../recoil/atoms';
import type {StackNavigationProp} from '../navigation/stack';

export const useNavigationEffect = () => {
  const {navigate} = useNavigation<StackNavigationProp<'Home'>>();

  const state = useRecoilValue(signalState);

  useEffect(() => {
    if (state.type === 'proposal') {
      navigate('Proposal');
    } else if (state.type === 'request') {
      navigate('Request');
    }
  }, [state]);
};
