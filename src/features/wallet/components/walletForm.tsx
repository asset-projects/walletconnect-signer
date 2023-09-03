import React, {type FC} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {DEVICE_WIDTH, COLORS} from '../../../commons';
import {Input} from '../../../components/commons/input';
import {walletState} from '../../../recoil/wallet';
import {useWalletMnemonicForm} from '../hooks/useWalletMnemonicForm';

export const WalletForm: FC = () => {
  const {address} = useRecoilValue(walletState);
  const {control, onSubmit, onReset} = useWalletMnemonicForm();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Animated.View style={styles.formTitleContainer}>
          <Animated.Text
            style={styles.formTitle}
            entering={FadeInUp.delay(180)}>
            Address
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.address}
          entering={FadeInUp.delay(180)}>
          {address}
        </Animated.Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Animated.Text
            style={styles.formTitle}
            entering={FadeInUp.delay(200)}>
            Seed phrase
          </Animated.Text>
        </View>

        <Controller
          control={control}
          name="phrase"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
            <Animated.View entering={FadeInUp.delay(200)}>
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
                <Animated.Text
                  style={styles.formErrorMessage}
                  entering={FadeIn.delay(200)}>
                  This is required.
                </Animated.Text>
              )}
              {errors.phrase?.type === 'validate' && (
                <Animated.Text
                  style={styles.formErrorMessage}
                  entering={FadeIn.delay(200)}>
                  Invalid phrase.
                </Animated.Text>
              )}
            </Animated.View>
          )}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Animated.Text
            style={styles.formTitle}
            entering={FadeInUp.delay(220)}>
            Path
          </Animated.Text>
        </View>

        <Controller
          control={control}
          name="path"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
            <Animated.View entering={FadeInUp.delay(220)}>
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
                <Animated.Text
                  style={styles.formErrorMessage}
                  entering={FadeIn.delay(200)}>
                  This is required.
                </Animated.Text>
              )}
            </Animated.View>
          )}
        />
      </View>

      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInUp.delay(240)}>
        <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>reset</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    width: DEVICE_WIDTH * 0.96,
  },
  formTitleContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  formTitle: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  formErrorMessage: {
    color: COLORS.red,
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
    backgroundColor: COLORS.blue,
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
    color: COLORS.blue,
    fontSize: 15,
    fontWeight: '600',
  },
  address: {
    color: COLORS.black,
    fontSize: 14,
  },
});
