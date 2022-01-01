/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import {useWalletConnectClient} from './src/hooks/client';

const App: React.VFC = () => {
  // const client = useWalletConnectClient();

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text>Wallet</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});

export default App;
