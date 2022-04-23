import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {User} from '../lib/users';

const emptyUser: User = {
  id: '',
  displayName: '',
  photoUrl: null,
};

const UserContext = createContext<{user: User; setUser(user: User): void}>({
  user: emptyUser,
  setUser(_user: User) {},
});

export const UserContextProvider = ({children}: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User>(emptyUser);

  return <UserContext.Provider children={children} value={{user, setUser}} />;
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return userContext;
};
