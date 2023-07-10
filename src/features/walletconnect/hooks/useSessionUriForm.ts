import {useForm} from 'react-hook-form';
import {sleep} from '../../../utils/commons';
import {useWalletConnectDispatch} from '../context/walletConnectProvider';

type FormData = {
  uri: string;
};

export const useSessionUriForm = (callback?: () => void) => {
  const {control, handleSubmit, reset, setError} = useForm<FormData>();
  const {pair} = useWalletConnectDispatch();

  const onSubmit = handleSubmit(async ({uri}) => {
    if (!uri.startsWith('wc:')) {
      return setError('uri', {message: 'Invalid wallet connect id'});
    }

    try {
      const pairing = await pair({uri});
      callback && callback();

      await sleep(1000);

      return pairing;
    } catch (e) {
      setError('uri', {message: 'Invalid wallet connect id'});
      return false;
    }
  });

  const onReset = () => {
    reset();
  };

  return {
    control,
    onSubmit,
    onReset,
  };
};
