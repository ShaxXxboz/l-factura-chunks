import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import {fetchCompanySet} from '../../thunks/companies';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Heading} from '../atoms';
import {BLACK, LIGHT} from '../../styles/colors';
import {
  FONT_SIZE_24,
  FONT_SIZE_18,
  FONT_FAMILY_BOLD,
} from '../../styles/typography';

const CompanyListItem = ({company}) => {
  const dispatch = useDispatch();
  return (
    <TouchableHighlight
      underlayColor={LIGHT}
      onPress={() => {
        dispatch(fetchCompanySet(company));
      }}
      style={styles.clickableWrapper}>
      <View style={styles.cardWrapper}>
        <Heading
          text={company.tin}
          color={BLACK}
          fontSize={FONT_SIZE_24}
          wrapperStyles={{marginTop: hp('2%')}}
        />
        <Heading
          text={company.name}
          fontSize={FONT_SIZE_18}
          fontFamily={FONT_FAMILY_BOLD}
          wrapperStyles={{marginTop: hp('2%')}}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  clickableWrapper: {
    height: hp('20%'),
    width: wp('95%'),
    marginHorizontal: wp('2.5%'),
    marginVertical: hp('2%'),
    borderWidth: 2,
    borderColor: LIGHT,
    borderRadius: 10,
  },
  cardWrapper: {
    height: hp('20%'),
    width: wp('95%'),
    padding: 10,
  },
});

export default CompanyListItem;
