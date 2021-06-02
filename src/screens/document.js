import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import DocListItemFooterActions from '../components/molecules/doc-list-item-footer-actions';
import {View} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LAVINA_BLUE} from '../styles/colors';
import {FONT_SIZE_22} from '../styles/typography';
import Icon from 'react-native-feather1s';
import {DocumentViewSpinner} from '../components/molecules';
import {ErrorToast, SuccessToast} from '../components/molecules';
import {getDocsStoreData} from '../redux/selectors/docs';
import {resetDocActionState, setLinkCopied} from '../redux/slices/docs';
import {isDev} from '../utils/helpers';

const Document = (props) => {
  const doc = props.route.params.doc;
  const link = 'https://l-factura.uz/check/?id=' + doc.id + '&dev=' + isDev();
  const [isLoading, setIsLoading] = useState(true);
  const errorToast = useRef(null);
  const successToast = useRef(null);
  const {
    docActionState,
    docActionSuccessMsg,
    docActionErrorMsg,
    linkCopied,
  } = useSelector(getDocsStoreData);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    if (docActionState === 'success') {
      successToast.current.show(docActionSuccessMsg, 1000);
    } else if (docActionState === 'failed') {
      errorToast.current.show(docActionErrorMsg, docActionErrorMsg.length * 25);
    }
    dispatch(resetDocActionState());
  }, [docActionState]);

  useEffect(() => {
    if (linkCopied) {
      successToast.current.show('Ссылка скопирована');
      dispatch(setLinkCopied(false));
    }
  }, [linkCopied]);

  return (
    <View style={styles.docViewWrapper}>
      <DocumentViewSpinner isVisible={isLoading} />
      <WebView
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.60, maximum-scale=1, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        source={{
          html: `<iframe width="100%" height="100%" style="border: 0" src=${link} allowfullscreen></iframe>`,
        }}
        style={{backgroundColor: 'gray'}}
      />
      {(doc.dir || doc.docDate) && (
        <View style={styles.footerActions}>
          <View style={styles.actionButtonWrapper}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                doc.docDate
                  ? props.navigation.goBack()
                  : props.navigation.replace('Main')
              }>
              <Icon name="arrow-left" style={styles.action} />
            </TouchableOpacity>
          </View>

          <DocListItemFooterActions doc={doc} navigation={props.navigation} />
        </View>
      )}
      <ErrorToast toastRef={errorToast} />
      <SuccessToast toastRef={successToast} />
    </View>
  );
};

const styles = StyleSheet.create({
  docViewWrapper: {
    flex: 1,
    borderWidth: 0,
  },
  footerActions: {
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('8%'),
    alignSelf: 'center',
    backgroundColor: 'white',
    zIndex: 1000,
  },
  actionButtonWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    color: LAVINA_BLUE,
    fontSize: FONT_SIZE_22,
  },
});

export default Document;
