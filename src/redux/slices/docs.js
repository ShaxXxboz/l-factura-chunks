import {createSlice} from '@reduxjs/toolkit';
import {getDefaultFilters} from '../../utils/helpers';

console.log(getDefaultFilters());

const initialState = {
  docs: [],
  curDoc: null,
  showRejectReasonModal: false,
  rejectReason: '',
  rejectingDoc: null,
  dir: 'inbox',
  pageCount: 0,
  currentPage: 1,
  fetchingState: null,
  fetchCurDocState: null,
  docActionState: null,
  docActionSuccessMsg: null,
  fetchingErrorMsg: null,
  docActionErrorMsg: null,
  fetchCurDocErrorMsg: null,
  docNotif: false,
  filters: getDefaultFilters(),
  count: 0,
  linkCopied: false,
};

const docs = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setShowRejectReasonModal: (state, action) => {
      state.showRejectReasonModal = action.payload.show;
      state.rejectingDoc = action.payload.rejectingDoc;
    },
    setRejectReason: (state, action) => {
      state.rejectReason = action.payload;
    },
    setDir: (state, action) => {
      state.dir = action.payload;
    },
    resetDocsState: (state) => {
      state.docs = [];
      state.currentPage = 1;
      state.fetchingState = null;
      state.count = 0;
    },
    resetDocActionState: (state) => {
      state.docActionState = null;
    },
    currentPageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    curDocFetching: (state) => {
      state.fetchCurDocState = 'pending';
    },
    curDocFetched: (state, action) => {
      state.curDoc = action.payload;
      state.fetchCurDocState = 'success';
    },
    curDocFetchError: (state, action) => {
      state.fetchCurDocState = 'failed';
      state.fetchCurDocErrorMsg = action.payload;
    },
    resetCurDoc: (state) => {
      state.curDoc = null;
      state.fetchCurDocState = null;
      state.fetchCurDocErrorMsg = null;
    },
    docsFetching: (state) => {
      state.fetchingState = 'pending';
    },
    docsFetched: (state, action) => {
      state.docs =
        state.currentPage > 1
          ? [...state.docs, ...action.payload.docs]
          : action.payload.docs;
      state.pageCount = action.payload.pageCount;
      state.fetchingState = action.payload.docs.length ? 'success' : 'finished';
      state.count = action.payload.count;
    },
    docsError: (state, action) => {
      state.fetchingState = 'failed';
      state.fetchingErrorMsg = action.payload;
    },
    changeFiltersValue: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      };
    },
    changeFilters: (state, action) => {
      state.filters = action.payload;
    },
    docActionPending: (state) => {
      state.docActionState = 'pending';
    },
    docActionSuccess: (state, action) => {
      state.docActionState = 'success';
      switch (action.payload.action) {
        case 'accept': {
          state.docActionSuccessMsg = 'Документ успешно подписан';
          const updatedDoc = action.payload.doc[0];
          state.docs[
            state.docs.findIndex((doc) => doc.id === updatedDoc.id)
          ] = updatedDoc;
          break;
        }
        case 'reject': {
          state.docActionSuccessMsg = 'Документ успешно отказан';
          const updatedDoc = action.payload.doc[0];
          state.docs[
            state.docs.findIndex((doc) => doc.id === updatedDoc.id)
          ] = updatedDoc;
          break;
        }
        case 'send': {
          state.docActionSuccessMsg = 'Документ успешно отправлен';
          state.docs = state.docs.filter((doc) => doc.id != action.payload.id);
          break;
        }
        case 'cancel': {
          state.docActionSuccessMsg = 'Документ успешно отменен';
          const updatedDoc = action.payload.doc[0];
          state.docs[
            state.docs.findIndex((doc) => doc.id === updatedDoc.id)
          ] = updatedDoc;
          break;
        }
        case 'delete': {
          state.docActionSuccessMsg = 'Документ успешно удален';
          state.docs = state.docs.filter((doc) => doc.id != action.payload.id);
          break;
        }
      }
    },
    docActionError: (state, action) => {
      state.docActionState = 'failed';
      state.docActionErrorMsg = action.payload;
    },
    setDocNotif: (state, action) => {
      state.docNotif = action.payload;
    },
    setLinkCopied: (state, action) => {
      state.linkCopied = action.payload;
    },
  },
});

const {actions, reducer} = docs;

export const {
  setDir,
  setShowRejectReasonModal,
  setRejectReason,
  resetDocsState,
  resetDocActionState,
  currentPageChange,
  curDocFetching,
  curDocFetched,
  curDocFetchError,
  resetCurDoc,
  docsFetching,
  docsFetched,
  docsFetchedNext,
  docsError,
  changeFiltersValue,
  changeFilters,
  docActionPending,
  docActionSuccess,
  docActionError,
  setDocNotif,
  setLinkCopied,
} = actions;

export default reducer;
