import React from 'react';
import {StyleSheet} from 'react-native';
import {WHITE} from '../../styles/colors';
import {MaterialIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

const DocumentViewSpinner = ({isVisible = true}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.overlay}
      animationIn="zoomInUp"
      animationOut="zoomInDown"
      coverScreen={false}
      backdropColor="gray"
      backdropOpacity={1}
      animationInTiming={1}
      animationOutTiming={1}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}>
      <MaterialIndicator color={WHITE} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default DocumentViewSpinner;
