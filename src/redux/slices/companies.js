const {createSlice} = require('@reduxjs/toolkit');
import {storeDataInAsyncStorage} from '../../utils/helpers';

const initialState = {
  lFacturaTin: '306851622',
  companies: [],
  companiesFetchingState: null,
  companySetFetchingState: null,
  editNotificationsFetchingState: null,
  companiesFetchingErrorMsg: null,
  companySetFetchingErrorMsg: null,
  editNotificationsFetchingErrorMsg: null,
};

const companies = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    resetCompaniesStore: (state) => {
      state.companiesFetchingState = null;
      state.companySetFetchingState = null;
    },
    companiesFetching: (state) => {
      state.companiesFetchingState = 'pending';
    },
    companiesFetched: (state, action) => {
      state.companiesFetchingState = 'success';
      state.companies = action.payload;
    },
    companiesFetchError: (state, action) => {
      state.companiesFetchingState = 'failed';
      state.companiesFetchingErrorMsg = action.payload;
    },
    companySetFetching: (state) => {
      state.companySetFetchingState = 'pending';
    },
    companySetFetched: (state, action) => {
      state.companySetFetchingState = 'success';
      storeDataInAsyncStorage(
        '@provider_info',
        JSON.stringify(action.payload.provider),
      );
      storeDataInAsyncStorage(
        '@company_selected',
        JSON.stringify(action.payload.companySelected),
      );
    },
    companySetFetchError: (state, action) => {
      state.companySetFetchingState = 'failed';
      state.companySetFetchingErrorMsg = action.payload;
    },
    editNotificationsFetching: (state) => {
      state.editNotificationsFetchingState = 'pending';
    },
    editNotificationsFetched: (state) => {
      state.editNotificationsFetchingState = 'success';
    },
    editNotificationsFetchError: (state, action) => {
      state.editNotificationsFetchingState = 'error';
      state.editNotificationsFetchingErrorMsg = action.payload;
    },
  },
});

const {actions, reducer} = companies;

export const {
  resetCompaniesStore,
  companiesFetching,
  companiesFetched,
  companiesFetchError,
  companySetFetching,
  companySetFetched,
  companySetFetchError,
  editNotificationsFetching,
  editNotificationsFetched,
  editNotificationsFetchError,
} = actions;

export default reducer;
