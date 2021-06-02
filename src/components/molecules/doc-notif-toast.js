import React from 'react';
import {View, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-easy-toast';
import {BLACK, LIGHT} from '../../styles/colors';
import {FONT_FAMILY_REGULAR} from '../../styles/typography';

const DocNotifToast = ({toastRef}) => {
  return (
    <Toast
      ref={toastRef}
      style={{backgroundColor: LIGHT}}
      position="top"
      positionValue={hp('12%')}
      fadeInDuration={300}
      fadeOutDuration={300}
      opacity={0.8}
      textStyle={{
        color: BLACK,
        fontFamily: FONT_FAMILY_REGULAR,
      }}
    />
  );
};

export default DocNotifToast;
