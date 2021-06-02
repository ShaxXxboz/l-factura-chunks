import React from 'react';
import {View, Icon} from 'native-base';
import {Text} from 'react-native';
import {getColorByStatus, getTextByStatus} from '../../utils/helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY_REGULAR} from '../../styles/typography';

export default function StatusBadge({status}) {
  const {color, colorDark} = getColorByStatus(status);
  const text = getTextByStatus(status);
  return (
    <View style={getStylesForStatusBadgeWrapper(color)}>
      <Icon
        name="dot-single"
        type="Entypo"
        style={getStylesForStatusBadgeIcon(colorDark)}
      />
      <Text style={getStylesForStatusBadgeText(colorDark)}>{text}</Text>
    </View>
  );
}

const getStylesForStatusBadgeWrapper = (color) => {
  return {
    backgroundColor: color,
    height: hp('5.2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    width: wp('43%'),
  };
};

const getStylesForStatusBadgeText = (colorDark) => {
  return {
    color: colorDark,
    alignSelf: 'center',
    fontFamily: FONT_FAMILY_REGULAR,
  };
};

const getStylesForStatusBadgeIcon = (colorDark) => {
  return {
    position: 'absolute',
    left: 5,
    color: colorDark,
    marginLeft: 3,
    marginRight: 25,
  };
};
