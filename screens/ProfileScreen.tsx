import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProps} from './RootStack';
import Profile from '../components/Profile';
import {HomeStackParamList} from './HomeStack';

const ProfileScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'Profile'>>();
  const navigation = useNavigation<RootNavigationProps>();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId ?? ''} />;
};

export default ProfileScreen;
