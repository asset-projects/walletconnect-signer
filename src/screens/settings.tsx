import React, {type FC} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {COMMON_STYLES, DEVICE_WIDTH} from '../commons/styles';
import {Input} from '../components/commons/input';
import {useWalletMnemonicForm} from '../features/wallet';
import {walletState} from '../recoil/wallet';

const Screen: FC = () => {
  const {address} = useRecoilValue(walletState);
  const {control, onSubmit, onReset} = useWalletMnemonicForm();

  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar barStyle={'light-content'} />

      <View style={[COMMON_STYLES.flex1, styles.container]}>
        <ScrollView style={[COMMON_STYLES.flex1]}>
          <View style={styles.formContainer}>
            <View style={styles.addressContainer}>
              <Text style={styles.formTitle}>Address</Text>
              <Text
                style={styles.address}
                numberOfLines={1}
                ellipsizeMode="middle">
                {address}
              </Text>
            </View>

            <View style={styles.formTitleContainer}>
              <Text style={styles.formTitle}>Seed phrase</Text>
            </View>

            <Controller
              control={control}
              name="phrase"
              rules={{required: true}}
              render={({
                field: {onChange, onBlur, value},
                formState: {errors},
              }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="method nuclear remain surround ..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="default"
                  />
                  {errors.phrase?.type === 'required' && (
                    <Text style={styles.formErrorMessage}>
                      This is required.
                    </Text>
                  )}
                  {errors.phrase?.type === 'validate' && (
                    <Text style={styles.formErrorMessage}>Invalid phrase.</Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formTitleContainer}>
              <Text style={styles.formTitle}>Path</Text>
            </View>

            <Controller
              control={control}
              name="path"
              rules={{required: true}}
              render={({
                field: {onChange, onBlur, value},
                formState: {errors},
              }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="m/44'/60'/0'/0/0"
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="default"
                  />
                  {errors.path?.type === 'required' && (
                    <Text style={styles.formErrorMessage}>
                      This is required.
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  formContainer: {
    width: DEVICE_WIDTH * 0.96,
  },
  addressContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  address: {
    fontSize: 14,
  },
  formTitleContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  formErrorMessage: {
    color: 'red',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    width: DEVICE_WIDTH * 0.96,
    paddingTop: 20,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 42,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: '50%',
    marginTop: 8,
  },
  resetButtonText: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '600',
  },
});
