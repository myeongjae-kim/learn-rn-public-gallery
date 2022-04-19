import React, {useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import {RootStackParamList} from './RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
type Form = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignInScreen = ({navigation, route}: Props) => {
  const {isSignUp} = route.params ?? {};
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const createChangeTextHandler = (name: keyof Form) => (value: string) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
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
          <View style={styles.buttons}>
            {isSignUp ? (
              <>
                <CustomButton
                  title={'회원가입'}
                  hasMarginBottom
                  onPress={onSubmit}
                />
                <CustomButton
                  title={'로그인'}
                  theme={'secondary'}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              </>
            ) : (
              <>
                <CustomButton
                  title={'로그인'}
                  hasMarginBottom
                  onPress={onSubmit}
                />
                <CustomButton
                  title={'회원가입'}
                  theme={'secondary'}
                  onPress={() => {
                    navigation.push('SignIn', {isSignUp: true});
                  }}
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
  fullscreen: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 32, fontWeight: 'bold'},
  form: {marginTop: 64, width: '100%', paddingHorizontal: 16},
  buttons: {marginTop: 64},
});

export default SignInScreen;
