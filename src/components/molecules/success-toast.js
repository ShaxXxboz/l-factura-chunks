import React from 'react';
import Toast from 'react-native-easy-toast';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY_REGULAR} from '../../styles/typography';
import {WHITE, SIGNED_DARK} from '../../styles/colors';

const SuccessToast = ({toastRef}) => {
  return (
    <Toast
      ref={toastRef}
      style={{backgroundColor: SIGNED_DARK}}
      position="bottom"
      positionValue={hp('23%')}
      fadeInDuration={300}
      fadeOutDuration={300}
      opacity={0.9}
      textStyle={{color: WHITE, fontFamily: FONT_FAMILY_REGULAR}}
    />
  );
};

export default SuccessToast;
