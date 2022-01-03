import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useUriForm} from '../hooks/uriForm';

const Screen: React.VFC = () => {
  const {uri, setUri, onSubmit} = useUriForm();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput value={uri} onChangeText={setUri} style={styles.textInput} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Pair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: Dimensions.get('screen').width * 0.86,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.18)',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingTop: 60,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('screen').width * 0.6,
    backgroundColor: 'rgba(59, 153, 252, 1)',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Screen;
