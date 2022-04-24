import React from 'react';
import {Image, ImageProps, ImageSourcePropType} from 'react-native';

type Props = Omit<ImageProps, 'source'> & {
  source?: ImageSourcePropType;
  size?: number;
};

const Avatar = ({source, size = 32, style, resizeMode, ...props}: Props) => {
  return (
    <Image
      {...props}
      source={source ?? require('../assets/user.png')}
      resizeMode={resizeMode ?? 'cover'}
      style={[style, {width: size, height: size, borderRadius: size / 2}]}
    />
  );
};

export default Avatar;
