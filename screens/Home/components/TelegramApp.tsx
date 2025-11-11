import React from 'react';
import FastImage from 'react-native-fast-image';

const TelegramApp = () => {
  return (
    <FastImage
      source={{
        uri:'https://www.cryptonotifycentral.com/wp-content/uploads/2024/04/definotify-phone2.png'
      }}
      resizeMode={'contain'}
      style={{
        width: 397,
        height: 492
      }}
    />
  );
};

export default TelegramApp;