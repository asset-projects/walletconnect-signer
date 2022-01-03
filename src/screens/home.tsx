import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {isConnectedState} from '../recoil/selector';
import {useSession} from '../hooks/session';
import {Wallet} from '../components/wallet';
import {NavigationButton} from '../components/navigationButton';

const Screen: React.VFC = () => {
  const {disconnect, ping} = useSession();

  const isConnected = useRecoilValue(isConnectedState);

  return (
    <SafeAreaView style={styles.container}>
      {isConnected && (
        <View style={styles.connectedContainer}>
          <TouchableOpacity
            onPress={ping}
            style={[styles.button, styles.pingButton]}>
            <Text style={styles.pingButtonLabel}>Ping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={disconnect}
            style={[styles.button, styles.disconnectButton]}>
            <Text style={styles.disconnectButtonLabhel}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}

      <Wallet />

      {!isConnected && <NavigationButton />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  connectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: (Dimensions.get('screen').width - 12 * 2) * 0.27,
    borderRadius: 18,
  },
  pingButton: {
    backgroundColor: '#efefef',
  },
  disconnectButton: {
    backgroundColor: 'rgba(215, 57, 73, 1)',
  },
  pingButtonLabel: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disconnectButtonLabhel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Screen;
