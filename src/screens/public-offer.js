import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {getUserStoreData} from '../redux/selectors/user';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {WHITE, LAVINA_BLUE, LAVINA_BLUE_DARK, LIGHT} from '../styles/colors';
import {Heading} from '../components/atoms';
import {FONT_SIZE_16} from '../styles/typography';
import {ErrorToast} from '../components/molecules';
import {MaterialIndicator} from 'react-native-indicators';
import {signPublicOffer} from '../thunks/user';
import {resetPublicOffer, userPublicOfferSignError} from '../redux/slices/user';

const PublicOffer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    publicOffer,
    userPublicOfferSignFetchingState,
    userPublicOfferSignFetchingErrorMsg,
  } = useSelector(getUserStoreData);
  const errorToast = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(Boolean(userPublicOfferSignFetchingState == 'pending'));

    if (userPublicOfferSignFetchingState == 'success') {
      dispatch(resetPublicOffer());
      props.navigation.replace('Companies', {autoSelectOff: false});
    }

    if (
      userPublicOfferSignFetchingState == 'failed' &&
      userPublicOfferSignFetchingErrorMsg
    ) {
      errorToast.current.show(
        userPublicOfferSignFetchingErrorMsg,
        userPublicOfferSignFetchingErrorMsg.length * 25,
      );
      dispatch(userPublicOfferSignError(null));
    }
  }, [userPublicOfferSignFetchingState]);

  return (
    <View style={styles.wrapper}>
      <Heading
        text="Публичная офферта"
        wrapperStyles={{marginVertical: hp('3%')}}
      />
      <View style={styles.offerTextWrapper}>
        <ScrollView>
          <Text>{publicOffer}</Text>
        </ScrollView>
      </View>
      {isLoading ? (
        <View style={styles.spinnerWrapper}>
          <MaterialIndicator color={LAVINA_BLUE} size={45} />
        </View>
      ) : (
        <TouchableHighlight
          underlayColor={LAVINA_BLUE}
          style={styles.button}
          onPress={() => dispatch(signPublicOffer(publicOffer))}>
          <Text style={styles.buttonText}>Принять</Text>
        </TouchableHighlight>
      )}
      <ErrorToast toastRef={errorToast} />
    </View>
  );
};

export default PublicOffer;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
    flex: 1,
  },
  offerTextWrapper: {
    borderWidth: 2,
    borderColor: LIGHT,
    marginHorizontal: wp('5%'),
    height: hp('70%'),
    padding: 8,
    backgroundColor: WHITE,
  },
  button: {
    marginHorizontal: wp('5%'),
    height: hp('8%'),
    marginTop: hp('3%'),
    backgroundColor: LAVINA_BLUE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: FONT_SIZE_16,
    color: WHITE,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    height: hp('8%'),
  },
});
