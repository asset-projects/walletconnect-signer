import React, {type FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {DEVICE_WIDTH} from '../../../../../commons';
import {walletConnectPairedProposalState} from '../../../../../recoil/walletConnect';
import {useSessionProposal} from '../../../hooks/useSessionProposal';
import {SheetHeader} from './commons/sheetHeader';

export const ApprovalSheet: FC = () => {
  const proposal = useRecoilValue(walletConnectPairedProposalState);
  const {onAccept, onDecline} = useSessionProposal();

  if (!proposal) {
    return null;
  }

  const {proposer, requiredNamespaces} = proposal.params;
  const name = proposer.metadata.name;
  const url = proposer.metadata.url;
  const methods = requiredNamespaces.eip155.methods;
  const events = requiredNamespaces.eip155.events;
  const chains = requiredNamespaces.eip155.chains;
  const icon = proposer.metadata.icons[0];

  return (
    <View style={styles.container}>
      <SheetHeader icon={icon} name={name} url={url} />

      <View style={styles.bodyContainer}>
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Chains</Text>

          <View style={styles.tagsBox}>
            {chains?.map(method => (
              <View key={`method_${method}`} style={styles.tag}>
                <Text style={styles.tagText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Methods</Text>

          <View style={styles.tagsBox}>
            {methods.map(method => (
              <View key={`method_${method}`} style={styles.tag}>
                <Text style={styles.tagText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Events</Text>

          <View style={styles.tagsBox}>
            {events?.map(method => (
              <View key={`method_${method}`} style={styles.tag}>
                <Text style={styles.tagText}>{method}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onDecline}
          style={[styles.button, styles.declineButton]}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAccept}
          style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Accept</Text>
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
  bodyContainer: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  tagsContainer: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },
  tagsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(221, 241, 248, 1)',
    marginRight: 8,
  },
  tagText: {
    color: '#555',
    fontSize: 12,
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
  acceptButton: {
    backgroundColor: 'rgba(200, 240, 210, 1)',
  },
  declineButton: {
    backgroundColor: '#ccc',
  },
});
