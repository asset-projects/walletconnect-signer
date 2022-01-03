import {useNavigation} from '@react-navigation/native';
import {useWalletConnectState} from '../context/client';
import {StackNavigationProp} from '../navigation/stack';

export const useWalletConnectHandler = () => {
  const {goBack} = useNavigation<StackNavigationProp<'Scanner'>>();
  const {client} = useWalletConnectState();

  const onRead = async (e: {data: string}) => {
    if (!client) {
      console.log('non client');
      return;
    }

    goBack();

    if (e.data.startsWith('wc:')) {
      try {
        await client.pair({uri: e.data});
      } catch {
        console.log('error pair');
      }
    }
  };

  return {
    onRead,
  };
};
