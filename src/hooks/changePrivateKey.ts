import {useCallback, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {accountState} from '../recoil/atoms';

export const useChangePrivateKey = () => {
  const setPrivateKey = useSetRecoilState(accountState);
  const [value, setValue] = useState<string>('');

  const onSubmit = useCallback(() => {
    if (value === '' || value === null || !value) return;

    setPrivateKey({privateKey: value});
  }, [value]);

  return {
    value,
    setValue,
    onSubmit,
  };
};
