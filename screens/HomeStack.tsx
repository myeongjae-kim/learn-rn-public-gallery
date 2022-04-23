import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';

export type HomeStackParamList = {Feed: undefined};

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Feed'} component={FeedScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
