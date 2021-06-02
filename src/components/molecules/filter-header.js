import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Animated,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONT_SIZE_18, FONT_SIZE_20} from '../../styles/typography';
import {SECONDARY, GRAY, LIGHT, LAVINA_BLUE} from '../../styles/colors';
import {Icon} from 'native-base';
import {HEADER_HEIGHT} from '../../styles/spacing';
import {getFilters} from '../../redux/selectors/docs';
import {changeFilters} from '../../redux/slices/docs';

const FilterHeader = ({
  scrollY,
  setIsFilterModalVisible,
  isFilterModalVisible,
  ...props
}) => {
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  return (
    <Animated.View
      style={[
        {
          transform: [{translateY: getHeaderY(scrollY)}],
        },
        styles.header,
      ]}>
      <View style={styles.headerWrapper}>
        <View style={[styles.filterSection, styles.filterSectionWithInput]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('QRScan');
            }}>
            <Icon
              name="qrcode"
              type="AntDesign"
              style={styles.searchSectionIcon}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.searchSectionInput}
            placeholder="Поиск документов"
            value={filters.search}
            onChangeText={(text) =>
              dispatch(changeFilters({...filters, search: text}))
            }
          />
        </View>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          onPress={() => {
            setIsFilterModalVisible(!isFilterModalVisible);
          }}
          style={
            isFilterModalVisible
              ? [
                  styles.filterSection,
                  styles.filterSectionButton,
                  styles.filterSectionButtonActive,
                ]
              : [styles.filterSection, styles.filterSectionButton]
          }>
          <Icon
            name="filter"
            type="Feather"
            style={
              isFilterModalVisible
                ? [
                    styles.filterSectionButtonIcon,
                    styles.filterSectionButtonIconActive,
                  ]
                : styles.filterSectionButtonIcon
            }
          />
        </TouchableHighlight>
      </View>
    </Animated.View>
  );
};

const getHeaderY = (scrollY) => {
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  return diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolateLeft: 'clamp',
  });
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SECONDARY,
    elevation: 3,
    marginTop: 0,
    zIndex: 1000,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('87%'),
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: LIGHT,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    height: 40,
    elevation: 1,
  },
  filterSectionWithInput: {
    width: wp('73%'),
    borderRadius: 50,
  },
  filterSectionButton: {
    width: wp('10.5%'),
    borderRadius: 10,
  },
  filterSectionButtonActive: {
    backgroundColor: LAVINA_BLUE,
    borderWidth: 0,
    padding: wp('0.5%'),
  },
  filterSectionButtonIcon: {
    padding: wp('2.5%'),
    margin: 0,
    fontSize: FONT_SIZE_18,
    color: GRAY,
  },
  filterSectionButtonIconActive: {
    color: LIGHT,
  },
  searchSectionInput: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  searchSectionIcon: {
    paddingHorizontal: 16,
    fontSize: FONT_SIZE_20,
    color: GRAY,
  },
});

export default FilterHeader;
