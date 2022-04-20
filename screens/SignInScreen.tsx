import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from './RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SignForm from '../components/SignForm';
import SignButtons from '../components/SignButtons';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignInScreen = ({navigation: _navigation, route}: Props) => {
  const {isSignUp} = route.params ?? {};
  const [form, setForm] = useState<SignFormType>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const createChangeTextHandler =
    (name: keyof SignFormType) => (value: string) => {
      setForm({...form, [name]: value});
    };
  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons isSignUp={isSignUp} onSubmit={onSubmit} />
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
