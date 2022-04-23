import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';

export type RootStackParamList = {
  SignIn: {isSignUp: boolean | undefined};
  Welcome: {uid: string | undefined};
  MainTab: undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {user} = useUserContext();

  return (
    <Stack.Navigator>
      {user.id.length > 0 ? (
        <>
          <Stack.Screen
            name={'MainTab'}
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={'SignIn'}
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Welcome'}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
