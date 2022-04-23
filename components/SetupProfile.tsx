import React, {useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProps, RootStackParamList} from '../screens/RootStack';
import {createUser, UserCreationRequest} from '../lib/users';
import {signOut} from '../lib/auth';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker/src/types';

const SetupProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation<RootNavigationProps>();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  const {params} = useRoute<RouteProp<RootStackParamList, 'Welcome'>>();
  const {uid} = params || {};

  const onSubmit = () => {
    const user: UserCreationRequest = {
      id: uid,
      displayName,
      photoUrl: null,
    };
    createUser(user).then();
    setUser({...user, id: user.id ?? ''});
  };

  const onCancel = () => {
    signOut().then();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          // 취소했을 경우
          return;
        }
        setResponse(res);
      },
    ).then();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={
            response
              ? {
                  uri: response?.assets?.[0]?.uri,
                }
              : require('../assets/user.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder={'닉네임'}
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType={'next'}
        />
        <View style={styles.buttons}>
          <CustomButton title={'다음'} onPress={onSubmit} hasMarginBottom />
          <CustomButton title={'취소'} onPress={onCancel} theme={'secondary'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    widht: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
