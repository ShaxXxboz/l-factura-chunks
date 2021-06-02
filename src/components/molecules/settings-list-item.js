import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-feather1s';
import {
  FONT_SIZE_18,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_BOLD,
  FONT_SIZE_12,
} from '../../styles/typography';
import {WHITE, GRAY, LIGHT} from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const SettingsListItem = ({
  title,
  subTitle,
  iconName,
  iconBgcolor,
  onPressHandle,
  rightComponent,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableHighlight
      onPress={() => onPressHandle(navigation, dispatch)}
      underlayColor={LIGHT}
      activeOpacity={rightComponent ? 1 : 0.8}>
      <View style={styles.itemWrapper}>
        <View style={styles.iconWrapper}>
          <View style={[styles.iconBox, {backgroundColor: iconBgcolor}]}>
            <Icon
              name={iconName}
              size={FONT_SIZE_18}
              color={WHITE}
              thin={false}
            />
          </View>
        </View>
        <View style={styles.titleWrapper}>
          <View style={styles.titleTexts}>
            <Text style={styles.titleText}>{title}</Text>
            {subTitle && <Text style={styles.titleSubText}>{subTitle}</Text>}
          </View>
          {rightComponent && (
            <View style={styles.rightComponent}>{rightComponent}</View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    height: hp('9%'),
    flexDirection: 'row',
    borderBottomWidth: hp('0.1%'),
    borderBottomColor: LIGHT,
  },
  iconWrapper: {
    width: wp('18%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    width: wp('85%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    borderRadius: wp('50%'),
    height: 38,
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTexts: {
    alignItems: 'flex-start',
  },
  titleText: {
    fontFamily: FONT_FAMILY_BOLD,
    fontStyle: 'italic',
  },
  titleSubText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_12,
    color: GRAY,
  },
  rightComponent: {
    marginRight: wp('6%'),
  },
});

export default SettingsListItem;
