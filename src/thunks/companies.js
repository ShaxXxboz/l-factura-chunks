import {
  companiesFetching,
  companiesFetched,
  companiesFetchError,
  companySetFetching,
  companySetFetched,
  companySetFetchError,
  editNotificationsFetching,
  editNotificationsFetched,
  editNotificationsFetchError,
} from '../redux/slices/companies';
import {getJsonResource, getTextResource} from './service-functions';
import {
  getDataFromAsyncStorage,
  storeDataInAsyncStorage,
  configurePushNotifications,
} from '../utils/helpers';

export const fetchCompanies = () => async (dispatch) => {
  dispatch(companiesFetching());

  getJsonResource('/hs/ut/getcompanies')
    .then((data) => {
      dispatch(companiesFetched(data));
    })
    .catch((e) => {
      console.log(e);
      companiesFetchError(e.message);
    });
};

export const fetchCompanySet = (company) => async (dispatch) => {
  dispatch(companySetFetching());
  const profile_settings = JSON.parse(
    await getDataFromAsyncStorage('@profile_settings'),
  );

  getJsonResource(
    `/hs/ut/setcompany/?tin=${company.tin}&id=${profile_settings.token}`,
  )
    .then((data) => {
      dispatch(companySetFetched({provider: data, companySelected: company}));
    })
    .catch((e) => {
      console.log(e);
      dispatch(companySetFetchError(e.message));
    });
};

export const fetchEditNotifications = (
  token,
  received,
  accepted,
  rejected,
  profileSettings,
) => async (dispatch) => {
  dispatch(editNotificationsFetching());

  getTextResource(
    `/hs/ut/editnotifications/${token}/${received}/${accepted}/${rejected}`,
  )
    .then(() => {
      storeDataInAsyncStorage(
        '@profile_settings',
        JSON.stringify(profileSettings),
      ).then(() => configurePushNotifications());

      dispatch(editNotificationsFetched());
    })
    .catch((e) => {
      console.log(e);
      dispatch(editNotificationsFetchError(JSON.stringify(e.message)));
    });
};
