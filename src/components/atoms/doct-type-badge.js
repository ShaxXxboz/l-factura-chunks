import React from 'react';
import {View} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import {LIGHT} from '../../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_FAMILY_REGULAR} from '../../styles/typography';

export default function DocTypeBadge({text}) {
  return (
    <View style={styles.docTypeBadge}>
      <Text style={styles.docTypeBadgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  docTypeBadge: {
    backgroundColor: LIGHT,
    height: hp('5.2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    width: wp('43%'),
  },
  docTypeBadgeText: {
    fontFamily: FONT_FAMILY_REGULAR,
  },
});
