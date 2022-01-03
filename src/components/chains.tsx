import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {chainDataState} from '../recoil/atoms';
import type {ChainNamespaces} from '../types';

export const getChainName = (chain: string, chainData: ChainNamespaces) => {
  const chainId = chain.replace('eip155:', '');
  return chainData.eip155[chainId] ? chainData.eip155[chainId].name : '';
};

type Props = {
  chains: string[];
};

export const Chains: React.VFC<Props> = ({chains}) => {
  const chainData = useRecoilValue(chainDataState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chains</Text>

      <View style={styles.listContainer}>
        {chains.map(item => (
          <View key={item}>
            <Text style={styles.listItemText}>
              {getChainName(item, chainData)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingTop: 12,
    paddingLeft: 12,
  },
  listItemText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
