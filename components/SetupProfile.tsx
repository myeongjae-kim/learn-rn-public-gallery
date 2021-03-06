import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProps, RootStackParamList} from '../screens/RootStack';
import {createUser, UserCreationRequest} from '../lib/users';
import {signOut} from '../lib/auth';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker/src/types';
import storage from '@react-native-firebase/storage';
import Avatar from './Avatar';

const SetupProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation<RootNavigationProps>();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  const {params} = useRoute<RouteProp<RootStackParamList, 'Welcome'>>();
  const {uid} = params || {};

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(false);

    let photoUrl: string | null = null;

    if (response && response.assets) {
      const asset = response.assets[0];
      const extension = asset.fileName?.split('.').pop() ?? '';

      const path = `/profile/${uid}.${extension}`;
      const reference = storage().ref(path);

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64 || '', 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri ?? '');
      }

      photoUrl = response ? await reference.getDownloadURL() : null;
    }

    const user: UserCreationRequest = {
      id: uid,
      displayName,
      photoUrl,
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
          // ???????????? ??????
          return;
        }
        setResponse(res);
      },
    ).then();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Avatar
          source={response ? {uri: response?.assets?.[0]?.uri} : undefined}
          size={128}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder={'?????????'}
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType={'next'}
        />
        {loading ? (
          <ActivityIndicator
            size={32}
            color={'#6200ee'}
            style={styles.spinner}
          />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title={'??????'} onPress={onSubmit} hasMarginBottom />
            <CustomButton
              title={'??????'}
              onPress={onCancel}
              theme={'secondary'}
            />
          </View>
        )}
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
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
  spinner: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetupProfile;
