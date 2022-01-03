import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {sessionState} from '../recoil/atoms';
import {useSession} from '../hooks/session';
import {MetaData} from './metaData';

export const NetworkComponent: React.VFC = () => {
  const sessionList = useRecoilValue(sessionState);

  const {disconnect, ping} = useSession();

  if (!sessionList.length) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <MetaData
        {...sessionList[0].peer.metadata}
        label="WalletConnect"
        border
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={ping}>
          <Text style={styles.pingButton}>Ping</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={disconnect} style={styles.space}>
          <Text style={styles.disconnectButton}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  buttonContainer: {
    paddingTop: 4,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pingButton: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disconnectButton: {
    color: 'rgba(215, 57, 73, 1)',
    fontSize: 12,
    fontWeight: 'bold',
  },
  space: {
    marginLeft: 20,
  },
});
