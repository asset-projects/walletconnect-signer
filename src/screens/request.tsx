import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRequest} from '../hooks/request';
import {Account} from '../components/account';
import {RequestMetaData} from '../components/requestMeta';

const Page: React.VFC = () => {
  const {approveRequest, rejectRequest} = useRequest();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Request</Text>
      </View>

      <ScrollView style={styles.mainContainer}>
        <Account />
        <RequestMetaData />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={rejectRequest}
          style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={approveRequest}
          style={[styles.button, styles.approveButton]}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Page;

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
