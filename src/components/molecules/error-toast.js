import React from 'react';
import Toast from 'react-native-easy-toast';
import {FONT_FAMILY_REGULAR} from '../../styles/typography';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {REJECTED_DARK, WHITE} from '../../styles/colors';

const ErrorToast = ({toastRef}) => {
  return (
    <Toast
      ref={toastRef}
      style={{backgroundColor: REJECTED_DARK}}
      position="bottom"
      positionValue={hp('23%')}
      fadeInDuration={500}
      fadeOutDuration={500}
      opacity={0.8}
      textStyle={{color: WHITE, fontFamily: FONT_FAMILY_REGULAR}}
    />
  );
};

export default ErrorToast;
