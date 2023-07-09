import {useRoute} from '@react-navigation/native';
import {getSdkError} from '@walletconnect/utils';
import React, {type FC} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useWalletConnectState} from '../features/walletconnect/context/walletConnectProvider';
import {RootStackRouteProps} from '../navigation';

const Screen: FC = () => {
  const {
    params: {topic},
  } = useRoute<RootStackRouteProps<'WalletConnectSession'>>();

  const {web3wallet} = useWalletConnectState();

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
    await web3wallet.disconnectSession({
      topic,
      reason: getSdkError('USER_DISCONNECTED'),
    });
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
