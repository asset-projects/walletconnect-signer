import React, {type FC} from 'react';
import {StyleSheet, TextInput, type TextInputProps} from 'react-native';
import {colors} from '../../commons';

export const Input: FC<TextInputProps> = props => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.inputPlaceholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: '100%',
    backgroundColor: colors.inputBackground,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
});
