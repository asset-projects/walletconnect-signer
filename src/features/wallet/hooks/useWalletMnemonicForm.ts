import {ethers} from 'ethers';
import {useForm} from 'react-hook-form';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {walletMnemonicState} from '../../../recoil/wallet';

type FormData = {
  phrase: string;
  path: string;
  locale: string;
};

export const useWalletMnemonicForm = () => {
  const {locale, path, phrase} = useRecoilValue(walletMnemonicState);
  const setWalletMnemonic = useSetRecoilState(walletMnemonicState);
  const {control, handleSubmit, reset, setError} = useForm<FormData>({
    defaultValues: {locale, path, phrase},
  });

  const onSubmit = handleSubmit((data: FormData) => {
    if (data.phrase !== phrase) {
      if (!ethers.utils.isValidMnemonic(data.phrase)) {
        setError('phrase', {type: 'validate', message: 'Invalid phrase'});
        return false;
      }
    }

    setWalletMnemonic({
      path: data.path,
      phrase: data.phrase,
      locale: data.locale,
    });
    return true;
  });

  const onReset = () => {
    reset({phrase, path});
  };

  return {
    control,
    onSubmit,
    onReset,
  };
};
