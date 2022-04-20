import React, {useState} from 'react';
import {
  Alert,
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
import {signIn, signUp} from '../lib/auth';

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
  const [loading, setLoading] = useState(false);

  const createChangeTextHandler =
    (name: keyof SignFormType) => (value: string) => {
      setForm({...form, [name]: value});
    };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const info = {email, password};
    setLoading(true);
    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      console.log(user);
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      } as {[x: string]: string};
      const msg =
        messages[(e as {code: string}).code] ||
        `${isSignUp ? '가입' : '로그인'} 실패`;

      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
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
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
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
