import firestore from '@react-native-firebase/firestore';
import {User} from './users';

const postsCollection = firestore().collection('posts');

export type PostCreationRequest = {
  user: User;
  photoURL: string;
  description: string;
};

export const createPost = ({
  user,
  photoURL,
  description,
}: PostCreationRequest) =>
  postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
