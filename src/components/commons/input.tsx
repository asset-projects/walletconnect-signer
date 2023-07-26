import React, {type FC} from 'react';
import {StyleSheet, TextInput, type TextInputProps} from 'react-native';
import {COLORS} from '../../commons';

export const Input: FC<TextInputProps> = props => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={COLORS.inputPlaceholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: '100%',
    backgroundColor: COLORS.inputBackground,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '500',
  },
});
