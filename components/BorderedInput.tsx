import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

type Props = {
  hasMarginBottom?: boolean;
  onChangeText?(text: string): void;
  value?: string;
  placeholder?: string;
};

const BorderedInput = ({hasMarginBottom, ...rest}: Props) => {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default BorderedInput;
