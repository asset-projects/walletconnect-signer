import React, {type FC} from 'react';
import {StyleSheet, TextInput, type TextInputProps} from 'react-native';

export const Input: FC<TextInputProps> = props => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
  },
});
