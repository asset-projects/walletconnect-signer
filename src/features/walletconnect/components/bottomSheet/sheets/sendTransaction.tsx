import React, {type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {DEVICE_WIDTH} from '../../../../../commons';
import {
  walletConnectRequestEventDataState,
  walletConnectRequestSessionState,
} from '../../../../../recoil/walletConnect';
import {useSessionRequest} from '../../../hooks/useSessionRequest';
import {getChainName} from '../../../utils/getChainName';
import type {EthSendTransactionParams} from '../../../types';
import {SheetHeader} from './commons/sheetHeader';

export const SendTransactionSheet: FC = () => {
  const requestSession = useRecoilValue(walletConnectRequestSessionState);
  const requestEventData = useRecoilValue(walletConnectRequestEventDataState);

  const {onApprove, onReject} = useSessionRequest();

  if (!requestSession || !requestEventData) {
    return null;
  }

  const {
    peer: {
      metadata: {icons, name, url},
    },
  } = requestSession;
  const {
    params: {chainId, request},
  } = requestEventData;
  const chainID = chainId.toUpperCase();
  const method = request.method;
  const params = request.params as EthSendTransactionParams;
  const transaction = params[0];

  return (
    <View style={styles.container}>
      <SheetHeader icon={icons[0]} name={name} url={url} />

      <View style={styles.bodyContainer}>
        <View style={styles.chainContainer}>
          <Text style={styles.chainTitle}>Chain</Text>
          <Text>{getChainName(chainID)}</Text>
        </View>

        <View style={styles.methodContainer}>
          <Text style={styles.methodTitle}>method</Text>
          <Text>{method}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>message</Text>

          <View style={styles.messageBodyContainer}>
            <Text
              numberOfLines={6}
              ellipsizeMode="middle"
              style={styles.message}>
              {JSON.stringify(transaction, null, 2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onReject}
          style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onApprove}
          style={[styles.button, styles.approveButton]}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CONTAINER_PADDING = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },
  bodyContainer: {
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  chainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 12,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageBodyContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  message: {
    color: '#888',
    fontSize: 14,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (DEVICE_WIDTH - CONTAINER_PADDING * 2) / 2 - 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  approveButton: {
    backgroundColor: 'rgba(200, 240, 210, 1)',
  },
  rejectButton: {
    backgroundColor: '#ccc',
  },
});
