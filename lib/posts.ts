import firestore from '@react-native-firebase/firestore';
import {User} from './users';

export type Post = {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  description: string;
  photoURL: string;
  user: User;
  id: string;
};

const postsCollection = firestore().collection<Omit<Post, 'id'>>('posts');

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
    createdAt: firestore.FieldValue.serverTimestamp() as any,
  });

export const PAGE_SIZE = 3;

export const getPosts = async () => {
  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .limit(PAGE_SIZE)
    .get();

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post),
  );
};

export const getOlderPosts = async (id: string) => {
  const cursorDoc = await postsCollection.doc(id).get();

  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post),
  );
};

export const getNewerPosts = async (id: string) => {
  const cursorDoc = await postsCollection.doc(id).get();

  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post),
  );
};
