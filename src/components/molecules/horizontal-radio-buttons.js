import React from 'react';
import {Text, TouchableHighlight, StyleSheet, View} from 'react-native';
import NestedScrollView from 'react-native-nested-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  LIGHT,
  LAVINA_BLUE,
  WHITE,
  LAVINA_BLUE_LIGHT,
} from '../../styles/colors';
import {Icon} from 'native-base';
import {
  FONT_SIZE_16,
  FONT_SIZE_14,
  FONT_SIZE_12,
} from '../../styles/typography';

const HorizontalRadioButtons = ({
  items,
  field,
  changeFilterField,
  setLocalFilters,
  selectedItem,
  sortDirection,
}) => {
  return (
    <NestedScrollView horizontal={true}>
      {items.map((item) => {
        const isSelected = selectedItem == item.value;
        return (
          <TouchableHighlight
            underlayColor={LAVINA_BLUE_LIGHT}
            onPress={() => {
              if (!isSelected) {
                changeFilterField(setLocalFilters, field, item.value);
              } else {
                if (sortDirection) {
                  changeFilterField(
                    setLocalFilters,
                    'sortType',
                    toggleSortDirection(sortDirection),
                  );
                }
              }
            }}
            style={
              isSelected ? [styles.button, styles.buttonActive] : styles.button
            }>
            <View style={styles.contentWrapper}>
              <Text style={isSelected && styles.labelActive}>{item.label}</Text>
              {isSelected && sortDirection && (
                <Icon
                  name={
                    sortDirection == 'asc'
                      ? 'sort-amount-asc'
                      : 'sort-amount-desc'
                  }
                  type="FontAwesome"
                  style={styles.icon}
                />
              )}
            </View>
          </TouchableHighlight>
        );
      })}
    </NestedScrollView>
  );
};

const toggleSortDirection = (sortDirection) => {
  return sortDirection == 'asc' ? 'desc' : 'asc';
};

const styles = StyleSheet.create({
  button: {
    marginRight: wp('2%'),
    marginVertical: hp('1%'),
    height: hp('5.3%'),
    width: wp('48%'),
    backgroundColor: LIGHT,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: LAVINA_BLUE,
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelActive: {
    color: WHITE,
  },
  icon: {
    position: 'absolute',
    right: wp('3.2%'),
    top: hp('0.6%'),
    fontSize: FONT_SIZE_12,
    color: WHITE,
  },
});

export default HorizontalRadioButtons;
