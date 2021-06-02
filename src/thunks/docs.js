import {
  sendDataJson,
  getDocInfo,
  getDocSign,
  getIP,
  sendDataText,
  getTextResource,
  getJsonResource,
} from './service-functions';
import {
  curDocFetching,
  curDocFetched,
  curDocFetchError,
  docsFetching,
  docsFetched,
  docsError,
  docActionPending,
  docActionSuccess,
  docActionError,
} from '../redux/slices/docs';
import EImzo from '../utils/e-imzo';
import {getDataFromAsyncStorage, convertDocType} from '../utils/helpers';

export const fetchDocs = (filters) => (dispatch) => {
  dispatch(docsFetching());
  return sendDataJson('/hs/st/getfiltered', JSON.stringify(filters))
    .then(({data, pageCount, Count}) => {
      dispatch(docsFetched({docs: data, pageCount: pageCount, count: Count}));
    })
    .catch((e) => {
      console.error(e.message);
      dispatch(docsError(JSON.stringify(e.message)));
    });
};

export const fetchCurDoc = (id) => (dispatch) => {
  dispatch(curDocFetching());
  return getJsonResource('/hs/ut/getdocinfo/' + id)
    .then((data) => {
      dispatch(curDocFetched(data));
    })
    .catch((e) => {
      console.log(e);
      dispatch(curDocFetchError(e.message));
    });
};

export const acceptDoc = (id, docType) => async (dispatch) => {
  dispatch(docActionPending());
  const docSign = await getDocSign(id);
  EImzo.appendPkcs7(
    docSign,
    await getDataFromAsyncStorage('@user_serial_number'),
  )
    .then((eimzoRes) => {
      const params = {
        id: id,
        docType: docType,
        action: 'accept',
      };
      dispatch(
        fetchReplyDocument(JSON.parse(eimzoRes).pkcs7String, params, 'accept'),
      );
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(JSON.stringify(e)));
    });
};

export const rejectDoc = (id, docType, notes = '') => async (dispatch) => {
  dispatch(docActionPending());
  const docInfo = await getDocInfo(id);
  const reply = {
    [convertDocType(docType)]: docInfo.contents,
    Notes: notes,
  };

  EImzo.createPkcs7(
    JSON.stringify(reply),
    await getDataFromAsyncStorage('@user_serial_number'),
  )
    .then((eimzoRes) => {
      const params = {
        id: id,
        docType: docType,
        action: 'reject',
        notes: notes,
      };
      dispatch(
        fetchReplyDocument(JSON.parse(eimzoRes).pkcs7String, params, 'reject'),
      );
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(JSON.stringify(e.message)));
    });
};

export const cancelDoc = (id, docType) => async (dispatch) => {
  dispatch(docActionPending());
  const reply = {
    [docType === 'HTML' || docType === 'PDF'
      ? 'id'
      : convertDocType(docType) + 'Id']: id,
    [docType === 'Доверенность'
      ? 'BuyerTin'
      : docType === 'HTML' || docType === 'PDF'
      ? 'SenderTin'
      : 'SellerTin']: JSON.parse(
      await getDataFromAsyncStorage('@company_selected'),
    ).tin,
  };

  EImzo.createPkcs7(
    JSON.stringify(reply),
    await getDataFromAsyncStorage('@user_serial_number'),
  )
    .then((eimzoRes) => {
      const params = {
        id: id,
        docType: docType,
      };
      dispatch(fetchCancelDoc(JSON.parse(eimzoRes).pkcs7String, params));
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(JSON.stringify(e.message)));
    });
};

export const sendDraft = (id, docType) => async (dispatch) => {
  dispatch(docActionPending());
  const docInfo = await getDocInfo(id);

  EImzo.createPkcs7(
    JSON.stringify(docInfo.contents),
    await getDataFromAsyncStorage('@user_serial_number'),
  )
    .then((eimzoRes) => {
      const params = {
        id: id,
        docType: docType,
      };
      dispatch(fetchSendDocument(JSON.parse(eimzoRes).pkcs7String, params));
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(JSON.stringify(e.message)));
    });
};

export const deleteDoc = (id) => async (dispatch) => {
  dispatch(docActionPending());

  getTextResource('/hs/ut/delete/' + id)
    .then(() => dispatch(docActionSuccess({id: id, action: 'delete'})))
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(e.message));
    });
};

export const fetchSendDocument = (signature, params) => async (dispatch) => {
  const body = {
    ИДДокумента: params.id,
    ДанныеДок: signature,
    ИП: await getIP(),
    ТипДокумента: params.docType,
  };

  sendDataText('/hs/m/send', JSON.stringify(body))
    .then(() => {
      dispatch(docActionSuccess({id: params.id, action: 'send'}));
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(e.message));
    });
};

export const fetchReplyDocument = (signature, params, action) => async (
  dispatch,
) => {
  const body = {
    ИДДокумента: params.id,
    ДанныеДок: signature,
    ИП: await getIP(),
    ТипДокумента: params.docType,
    Заметки: params.notes ? params.notes : '',
    Действие: params.action,
  };

  console.log('first');

  sendDataText('/hs/m/reply', JSON.stringify(body))
    .then((res) => {
      dispatch(docActionSuccess({action: action, doc: JSON.parse(res).data}));
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(e.message));
    });
};

export const fetchCancelDoc = (signature, params) => async (dispatch) => {
  const body = {
    ИДДокумента: params.id,
    ДанныеДок: signature,
    ИП: await getIP(),
    ТипДокумента: params.docType,
  };

  sendDataText('/hs/m/cancel', JSON.stringify(body))
    .then((res) => {
      console.log(res);
      dispatch(docActionSuccess({action: 'cancel', doc: JSON.parse(res).data}));
    })
    .catch((e) => {
      console.log(e);
      dispatch(docActionError(e.message));
    });
};
