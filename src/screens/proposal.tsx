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
import {signalState} from '../recoil/atoms';
import {useSession} from '../hooks/session';
import {MetaData} from '../components/metaData';
import {Chains} from '../components/chains';
import {Account} from '../components/account';

const Screen: React.VFC = () => {
  const {approveSession, rejectSession} = useSession();
  const signalValues = useRecoilValue(signalState);

  if (signalValues.type !== 'proposal') {
    return (
      <SafeAreaView style={styles.container}>
        <Text>loading...</Text>
      </SafeAreaView>
    );
  }

  const {proposer, permissions} = signalValues.data.proposal;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>proposal</Text>
      </View>

      <View style={styles.mainContainer}>
        <MetaData {...proposer.metadata} />
        <Chains chains={permissions.blockchain.chains} />
        <Account />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={approveSession}
          style={[styles.button, styles.approveButton]}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={rejectSession}
          style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.86)',
    fontSize: 21,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.4,
    height: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approveButton: {
    backgroundColor: 'rgba(59, 153, 252, 1)',
  },
  rejectButton: {
    backgroundColor: 'rgba(215, 57, 73, 1)',
  },
});

export default Screen;
