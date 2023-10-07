import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../commons';
import {QRCodeScanner} from '../features/qrcodeScanner';
import {type FormValues, URIForm} from '../features/walletconnect';
import type {RootStackNavigationProp} from '../navigation';

const Screen: FC = () => {
  const {goBack} = useNavigation<RootStackNavigationProp<'Scan'>>();
  const methods = useForm<FormValues>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Icon name="chevron-left" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <FormProvider {...methods}>
        <QRCodeScanner />
        <URIForm />
      </FormProvider>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.gray,
  },
  headerContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
