import type {SessionTypes} from '@walletconnect/types';
import React, {type FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {colors} from '../../../../commons';
import {walletConnectConnectedState} from '../../../../recoil/walletConnect';
import {isEmptyObject} from '../../../../utils/commons';
import {useWalletConnectState} from '../../context/walletConnectProvider';
import {WalletConnectSessionList} from './list';

export const WalletConnectSessions: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WalletConnect Sessions</Text>

      <Main />
    </View>
  );
};

const Main: FC = () => {
  const {web3wallet} = useWalletConnectState();
  const isWalletConnectConnected = useRecoilValue(walletConnectConnectedState);

  const [activeSessions, setActiveSessions] = useState<
    Record<string, SessionTypes.Struct> | undefined
  >();

  useEffect(() => {
    if (web3wallet) {
      const _activeSessions = web3wallet.getActiveSessions();
      !isEmptyObject(_activeSessions) && setActiveSessions(_activeSessions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWalletConnectConnected]);

  if (!activeSessions) {
    return (
      <View style={styles.emptySessionsContainer}>
        <Text style={styles.text}>No active sessions</Text>
      </View>
    );
  }

  const sessions = Object.values(activeSessions);

  return (
    <View style={styles.sessionsContainer}>
      <WalletConnectSessionList data={sessions} />
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
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: colors.black,
  },
});
