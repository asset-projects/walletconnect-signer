import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useWalletState} from '../context/wallet';
import {useChangePrivateKey} from '../hooks/changePrivateKey';

const Page: React.VFC = () => {
  const {wallet} = useWalletState();
  const {value, setValue, onSubmit} = useChangePrivateKey();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.valueContainer}>
        <Text style={styles.valueTitle}>Address</Text>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.value}>
          {wallet ? wallet.address : ''}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Change PrivateKey</Text>
        <TextInput value={value} onChangeText={setValue} style={styles.input} />

        <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonLabel}>Change PrivateKey</Text>
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
  valueContainer: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  valueTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginTop: 12,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('screen').width * 0.66,
    backgroundColor: '#A9C9FF',
    borderRadius: 12,
    marginTop: 30,
  },
  submitButtonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
