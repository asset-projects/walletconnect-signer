import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {COMMON_STYLES} from '../commons/styles';
import {Input} from '../components/commons/input';
import {useSessionUriForm} from '../features/walletconnect';
import type {RootStackNavigationProp} from '../navigation';

const Screen: FC = () => {
  const {goBack} = useNavigation<RootStackNavigationProp<'Scan'>>();
  const {control, onSubmit, onReset} = useSessionUriForm(goBack);

  return (
    <SafeAreaView style={[COMMON_STYLES.flex1, COMMON_STYLES.backgroundColor]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text>WalletConnect</Text>

        <Controller
          control={control}
          name="uri"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
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
              {errors.uri?.type === 'required' && (
                <Text style={styles.formErrorMessage}>Required</Text>
              )}
              {errors.uri?.type === 'validate' && (
                <Text style={styles.formErrorMessage}>Invalid phrase</Text>
              )}
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSubmit}>
            <Text>Connect App</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onReset}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  formErrorMessage: {
    color: 'red',
    fontSize: 14,
  },
});
