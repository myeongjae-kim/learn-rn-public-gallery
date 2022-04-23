import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';

export type MyProfileStackParamList = {MyProfile: undefined};

export type MyProfileNavigationProps =
  NativeStackNavigationProp<MyProfileStackParamList>;

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

const MyProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'MyProfile'} component={MyProfileScreen} />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
