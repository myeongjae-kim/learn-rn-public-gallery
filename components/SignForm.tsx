import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import BorderedInput from './BorderedInput';
import {SignFormType} from '../screens/SignInScreen';

type Props = {
  isSignUp?: boolean;
  onSubmit(): void;
  form: SignFormType;
  createChangeTextHandler(name: keyof SignFormType): (value: string) => void;
};

const SignForm = ({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}: Props) => {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder={'이메일'}
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize={'none'}
        autoCorrect={false}
        autoComplete={'email'}
        keyboardType={'email-address'}
        returnKeyType={'next'}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BorderedInput
        hasMarginBottom={isSignUp}
        placeholder={'비밀번호'}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current?.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder={'비밀번호 확인'}
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType={'done'}
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
};

export default SignForm;
