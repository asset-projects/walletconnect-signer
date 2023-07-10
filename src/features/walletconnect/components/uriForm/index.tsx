import {useNavigation} from '@react-navigation/native';
import React, {type FC} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, DEVICE_WIDTH} from '../../../../commons';
import {Input} from '../../../../components/commons/input';
import {RootStackNavigationProp} from '../../../../navigation';
import {useSessionUriForm} from '../../hooks/useSessionUriForm';

export const URIForm: FC = () => {
  const {goBack} = useNavigation<RootStackNavigationProp<'Scan'>>();
  const {control, onSubmit} = useSessionUriForm(goBack);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="uri"
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.formContainer}>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="method nuclear remain surround ..."
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Pair</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const CONTAINER_PADDING = 8;
const CONTAINER_MIN_HEIGHT = 60;
const FORM_CONTAINER = DEVICE_WIDTH - CONTAINER_PADDING * 2;
const INPUT_WIDTH = FORM_CONTAINER * 0.8;
const BUTTON_CONTAINER_WIDTH = FORM_CONTAINER * 0.2;
const BUTTON_WIDTH = BUTTON_CONTAINER_WIDTH * 0.8;

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_MIN_HEIGHT,
    minHeight: CONTAINER_MIN_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: colors.white,
    paddingHorizontal: CONTAINER_PADDING,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: BUTTON_CONTAINER_WIDTH,
  },
  input: {
    width: INPUT_WIDTH,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: BUTTON_WIDTH,
    backgroundColor: colors.blue,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
