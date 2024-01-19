import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {COLORS, COMMON_STYLES, DEVICE_WIDTH} from '../commons';
import {useDisconnect} from '../features/walletconnect/hooks/useDisconnect';
import type {RootStackNavigationProp, RootStackRouteProps} from '../navigation';
import {walletConnectActiveSessionsState} from '../recoil/walletConnect';

function Screen(): React.JSX.Element {
  const {
    params: {topic},
  } = useRoute<RootStackRouteProps<'WalletConnectSession'>>();
  const {goBack} =
    useNavigation<RootStackNavigationProp<'WalletConnectSession'>>();

  const activeSessions = useRecoilValue(walletConnectActiveSessionsState);
  const {disconnect} = useDisconnect();

  if (!activeSessions) {
    return (
      <SafeAreaView
        style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}
      />
    );
  }

  const sessions = Object.values(activeSessions);
  const session = sessions.find(s => s.topic === topic);

  const onDisconnect = async () => {
    disconnect(topic, goBack);
  };

  if (!session) {
    return (
      <SafeAreaView
        style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}
      />
    );
  }

  const {
    peer: {
      metadata: {name, icons, url},
    },
  } = session;

  return (
    <SafeAreaView
      style={[
        COMMON_STYLES.flex1,
        COMMON_STYLES.backgroundColor,
        styles.container,
      ]}>
      <View style={styles.metadataContainer}>
        <Image source={{uri: icons[0]}} style={styles.image} />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.url}>{url}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onDisconnect}
          style={styles.disconnectButton}>
          <Text style={styles.disconnectButtonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Screen;

const BUTTON_HEIGHT = 50;
const BUTTON_WIDTH = DEVICE_WIDTH * 0.95;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  metadataContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  url: {
    color: COLORS.black,
    fontSize: 16,
  },
  disconnectButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.red,
    borderRadius: 12,
  },
  disconnectButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
