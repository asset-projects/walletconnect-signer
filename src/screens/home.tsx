import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {useWalletConnectHandler} from '../hooks/handler';

const Screen: React.VFC = () => {
  const {pairing} = useWalletConnectHandler();

  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button title="pairing" onPress={pairing} />
      </View>
    </SafeAreaView>
  );
};

export default Screen;
