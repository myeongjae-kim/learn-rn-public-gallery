import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export type UserCreationRequest = {
  id?: string;
  displayName: string;
  photoUrl: string | null;
};

export type User = {
  id: string;
  displayName: string;
  photoUrl: string | null;
};

export const createUser = ({id, displayName, photoUrl}: UserCreationRequest) =>
  usersCollection.doc(id).set({
    id,
    displayName,
    photoUrl,
  });

export const getUser = (id: string) =>
  usersCollection
    .doc(id)
    .get()
    .then(it => it.data() as unknown as User);
