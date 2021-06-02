import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {LIGHT, NAVY} from '../../styles/colors';
import Heading from '../atoms/heading';
import {
  FONT_SIZE_16,
  FONT_FAMILY_REGULAR,
  FONT_SIZE_14,
} from '../../styles/typography';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {trimString} from '../../utils/helpers';

export default function FieldsetLegend({label, no, date}) {
  return (
    <View style={styles.fieldSet}>
      <Heading
        wrapperStyles={styles.legendWrapper}
        text={label}
        fontSize={FONT_SIZE_16}
        fontFamily={FONT_FAMILY_REGULAR}
      />
      <View style={styles.legendItem}>
        <View style={styles.legendItemIconWrapper}>
          <Icon
            type="FontAwesome"
            name={label === 'Документ' ? 'file-o' : 'file-text-o'}
            style={styles.legendItemIcon}
          />
        </View>
        <Text style={styles.legendItemText}>{trimString(no, 10)}</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={styles.legendItemIconWrapper}>
          <Icon
            type="FontAwesome"
            name="calendar"
            style={styles.legendItemIcon}
          />
        </View>
        <Text style={styles.legendItemText}>
          {moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldSet: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: LIGHT,
    width: wp('43%'),
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  legendWrapper: {
    position: 'absolute',
    top: -hp('1.5%'),
    left: wp('9%'),
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  legendItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  legendItemText: {
    color: NAVY,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  legendItemIconWrapper: {
    width: wp('6%'),
    height: hp('3.5%'),
    marginRight: wp('2%'),
    backgroundColor: LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  legendItemIcon: {
    color: NAVY,
    fontSize: FONT_SIZE_14,
  },
});
