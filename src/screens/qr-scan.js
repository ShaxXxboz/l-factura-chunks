import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {StyleSheet, View} from 'react-native';
import {getIdFromString, getCurDocAndDir} from '../utils/helpers';
import {getDocsStoreData} from '../redux/selectors/docs';
import {fetchCurDoc} from '../thunks/docs';
import {resetCurDoc} from '../redux/slices/docs';
import {MaterialIndicator} from 'react-native-indicators';
import {LAVINA_BLUE, LIGHT} from '../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ErrorToast, SuccessToast} from '../components/molecules';

const QRScan = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {curDoc, fetchCurDocState, fetchCurDocErrorMsg} = useSelector(
    getDocsStoreData,
  );
  const dispatch = useDispatch();
  const errorToast = useRef(null);
  const successToast = useRef(null);

  useEffect(() => {
    if (curDoc) {
      getCurDocAndDir(curDoc)
        .then((doc) => {
          props.navigation.replace('Document', {
            doc: doc,
          });
        })
        .then(() => dispatch(resetCurDoc()));
    }
  }, [curDoc]);

  useEffect(() => {
    setIsLoading(
      Boolean(fetchCurDocState === 'pending' || fetchCurDocState === 'success'),
    );

    if (fetchCurDocState === 'failed') {
      errorToast.current.show(
        fetchCurDocErrorMsg,
        fetchCurDocErrorMsg.length * 25,
      );
      dispatch(resetCurDoc());
    }
  }, [fetchCurDocState]);

  const onSuccess = (e) => {
    try {
      const id = getIdFromString(e.data);
      dispatch(fetchCurDoc(id));
      // eslint-disable-next-line no-catch-shadow
    } catch (err) {
      errorToast.current.show('Недействительный QR-код', 1000);
    }
  };

  return (
    <>
      {isLoading && (
        <View style={styles.loaderWrapper}>
          <MaterialIndicator color={LAVINA_BLUE} size={40} />
        </View>
      )}
      <QRCodeScanner
        onRead={onSuccess}
        containerStyle={styles.containerStyle}
        cameraStyle={styles.cameraStyle}
        showMarker={!isLoading}
        reactivate={true}
        reactivateTimeout={3000}
      />
      <ErrorToast toastRef={errorToast} />
      <SuccessToast toastRef={successToast} />
    </>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    position: 'absolute',
    top: hp('44%'),
    left: wp('7.5%'),
    right: wp('7.5%'),
    bottom: hp('44%'),
    height: hp('12%'),
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT,
    zIndex: 1000000,
    opacity: 0.8,
  },
});

export default QRScan;
