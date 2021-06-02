import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, FlatList} from 'react-native';
import {Container} from 'native-base';
import {fetchCompanies, fetchCompanySet} from '../thunks/companies';
import {getCompaniesStoreData} from '../redux/selectors/companies';
import {MaterialIndicator} from 'react-native-indicators';
import {LAVINA_BLUE} from '../styles/colors';
import {resetCompaniesStore} from '../redux/slices/companies';
import {ErrorToast, SuccessToast} from '../components/molecules';
import CompanyListItem from '../components/molecules/company-list-item';
import {getDataFromAsyncStorage} from '../utils/helpers';

const Companies = (props) => {
  const dispatch = useDispatch();
  const {
    companies,
    companiesFetchingState,
    companySetFetchingState,
    companiesFetchingErrorMsg,
    companySetFetchingErrorMsg,
  } = useSelector(getCompaniesStoreData);
  const [isLoading, setIsLoading] = useState(true);
  const errorToast = useRef(null);
  const successToast = useRef(null);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  useEffect(() => {
    if (
      companies.length === 1 &&
      props.route.params &&
      !props.route.params.autoSelectOff
    ) {
      dispatch(fetchCompanySet(companies[0]));
    }
  }, [companies]);

  useEffect(() => {
    setIsLoading(
      Boolean(
        companiesFetchingState === 'pending' ||
          companySetFetchingState === 'pending' ||
          companySetFetchingState === 'success',
      ),
    );
  }, [companiesFetchingState, companySetFetchingState]);

  useEffect(() => {
    if (companySetFetchingState === 'success') {
      props.navigation.replace('Main');

      dispatch(resetCompaniesStore());
    }

    if (companySetFetchingState === 'failed') {
      errorToast.current.show(
        companySetFetchingErrorMsg,
        companySetFetchingErrorMsg.length * 25,
      );
    }
  }, [companySetFetchingState]);

  useEffect(() => {
    if (companiesFetchingState === 'failed') {
      errorToast.current.show(
        companiesFetchingErrorMsg,
        companiesFetchingErrorMsg.length * 25,
      );
    }
  }, [companiesFetchingState]);

  return (
    <>
      {!isLoading && (
        <Container>
          <FlatList
            data={companies}
            renderItem={({item}) => <CompanyListItem company={item} />}
            keyExtractor={(item) => item.tin}
            ListEmptyComponent={<Text>Нет компаний</Text>}
          />
        </Container>
      )}
      <ErrorToast toastRef={errorToast} />
      <SuccessToast toastRef={successToast} />
      {isLoading && <MaterialIndicator color={LAVINA_BLUE} size={45} />}
      <ErrorToast toastRef={errorToast} />
      <SuccessToast toastRef={successToast} />
    </>
  );
};

export default Companies;
