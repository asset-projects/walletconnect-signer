import React, {type FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {colors} from '../../../../commons';
import {walletConnectActiveSessionsState} from '../../../../recoil/walletConnect';
import {isEmptyObject} from '../../../../utils/commons';
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
  const activeSessions = useRecoilValue(walletConnectActiveSessionsState);

  if (!activeSessions || isEmptyObject(activeSessions)) {
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
