import {useNavigation, useRoute} from '@react-navigation/native';
import {getSdkError} from '@walletconnect/utils';
import React, {type FC} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useResetRecoilState} from 'recoil';
import {useWalletConnectState} from '../features/walletconnect/context/walletConnectProvider';
import {RootStackNavigationProp, RootStackRouteProps} from '../navigation';
import {walletConnectConnectedState} from '../recoil/walletConnect';

const Screen: FC = () => {
  const {
    params: {topic},
  } = useRoute<RootStackRouteProps<'WalletConnectSession'>>();
  const {goBack} =
    useNavigation<RootStackNavigationProp<'WalletConnectSession'>>();

  const {web3wallet} = useWalletConnectState();
  const resetIsWalletConnectConnected = useResetRecoilState(
    walletConnectConnectedState,
  );

  if (!web3wallet) {
    return (
      <SafeAreaView>
        <></>
      </SafeAreaView>
    );
  }

  const sessions = Object.values(web3wallet?.getActiveSessions());
  const session = sessions.find(s => s.topic === topic);

  const onExtendSession = async () => {
    await web3wallet.extendSession({topic});
  };

  const onDisconnect = async () => {
    try {
      await web3wallet.disconnectSession({
        topic,
        reason: getSdkError('USER_DISCONNECTED'),
      });

      resetIsWalletConnectConnected();
      goBack();
    } catch (e) {
      console.log('Error disconnecting session', e);
    }
  };

  if (!session) {
    return (
      <SafeAreaView>
        <></>
      </SafeAreaView>
    );
  }

  const {
    peer: {
      metadata: {name, icons, url},
    },
  } = session;

  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <Text>{url}</Text>
      <Image source={{uri: icons[0]}} />

      <TouchableOpacity onPress={onExtendSession}>
        <Text>Extend a Session</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDisconnect}>
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Screen;
