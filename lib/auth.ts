import auth from '@react-native-firebase/auth';

export type SignRequest = {
  email: string;
  password: string;
};

export const signIn = ({email, password}: SignRequest) =>
  auth().signInWithEmailAndPassword(email, password);

export const signUp = ({email, password}: SignRequest) =>
  auth().createUserWithEmailAndPassword(email, password);

export const subscribeAuth = (callback: any) =>
  auth().onAuthStateChanged(callback);

export const signOut = () => auth().signOut();
