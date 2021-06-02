import React, {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {Heading} from '../atoms';
import {
  setRejectReason,
  setShowRejectReasonModal,
} from '../../redux/slices/docs';
import {getDocsStoreData} from '../../redux/selectors/docs';
import {
  LIGHT,
  WHITE,
  BLACK,
  LAVINA_BLUE,
  LAVINA_BLUE_LIGHT,
} from '../../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {rejectDoc} from '../../thunks/docs';

const ConfirmRejectModal = () => {
  const dispatch = useDispatch();
  const {showRejectReasonModal, rejectingDoc, rejectReason} = useSelector(
    getDocsStoreData,
  );

  return (
    <Modal
      isVisible={showRejectReasonModal}
      backdropColor={BLACK}
      backdropOpacity={0.7}
      coverScreen={true}
      onBackdropPress={() =>
        dispatch(setShowRejectReasonModal({show: false, rejectingDoc: null}))
      }>
      <View style={styles.modalContent}>
        <Heading
          text={'Пожалуйста, укажите причину отказа'}
          wrapperStyles={styles.headingWrapper}
        />
        <TextInput
          onChangeText={(text) => setRejectReason(text)}
          style={styles.input}
          placeholder="Причина отказа"
          autoFocus={true}
        />
        <View style={styles.actionButtons}>
          <TouchableHighlight
            style={[styles.button, {backgroundColor: LIGHT}]}
            underlayColor={LIGHT}
            activeOpacity={0.7}
            onPress={() =>
              dispatch(
                setShowRejectReasonModal({show: false, rejectingDoc: null}),
              )
            }>
            <Text>Отмена</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, {backgroundColor: LAVINA_BLUE}]}
            underlayColor={LAVINA_BLUE_LIGHT}
            onPress={() => {
              dispatch(
                rejectDoc(rejectingDoc.id, rejectingDoc.docType, rejectReason),
              );
              dispatch(
                setShowRejectReasonModal({show: false, rejectingDoc: null}),
              );
            }}>
            <Text style={{color: WHITE}}>Отказать</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: hp('25.5%'),
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: wp('4%'),
  },
  headingWrapper: {
    marginTop: hp('2.5%'),
  },
  input: {
    paddingHorizontal: wp('2%'),
    height: hp('6%'),
    marginTop: hp('3%'),
    borderWidth: 1,
    borderColor: LIGHT,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: hp('3%'),
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center',
  },
  button: {
    height: hp('4.5%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ConfirmRejectModal;
