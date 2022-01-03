import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {signalState} from '../recoil/atoms';

export const RequestMetaData: React.VFC = () => {
  const signalValues = useRecoilValue(signalState);

  if (signalValues.type !== 'request') {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  }

  const {requestEvent} = signalValues.data;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Method</Text>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{requestEvent.request.method}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Params</Text>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>
          {JSON.stringify(requestEvent.request.params)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  titleContainer: {
    paddingTop: 12,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueContainer: {
    paddingTop: 8,
    paddingLeft: 12,
  },
  value: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
