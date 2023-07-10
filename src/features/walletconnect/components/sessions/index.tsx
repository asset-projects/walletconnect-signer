import React, {type FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {walletConnectConnectedState} from '../../../../recoil/walletConnect';
import {useWalletConnectState} from '../../context/walletConnectProvider';
import {WalletConnectSessionList} from './list';

export const WalletConnectSessions: FC = () => {
  const {web3wallet} = useWalletConnectState();
  const isWalletConnectConnected = useRecoilValue(walletConnectConnectedState);

  if (!web3wallet || !isWalletConnectConnected) {
    return <></>;
  }

  const sessions = Object.values(web3wallet.getActiveSessions());

  if (!sessions || !sessions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WalletConnect Sessions</Text>

        <View style={styles.emptySessionsContainer}>
          <Text>No active sessions</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WalletConnect Sessions</Text>

      <View style={styles.sessionsContainer}>
        <WalletConnectSessionList data={sessions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  sessionsContainer: {
    alignItems: 'center',
    paddingTop: 12,
  },
  emptySessionsContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
