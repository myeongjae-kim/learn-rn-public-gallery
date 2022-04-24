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

export const getPosts = async (arg?: {
  userId?: string;
  mode?: 'newer' | 'older';
  id?: string;
}) => {
  const userId = arg?.userId;
  const mode = arg?.mode;
  const id = arg?.id;

  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id' as any, '==', userId);
  }
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();

  return snapshot.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post),
  );
};

export const getOlderPosts = async (id: string, userId?: string) =>
  getPosts({id, mode: 'older', userId});

export const getNewerPosts = async (id: string, userId?: string) =>
  getPosts({id, mode: 'newer', userId});
