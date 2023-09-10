import * as React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ELoanSteps } from '../interfaces';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import {
  denyApplication,
  selectAppId, selectLoanOffersArray,
  selectLoanStatus, setAppId,
  setLoans, setStatusLoan,
} from '../redux/slices/loanOffersSlice';
import {
  getStateFromStorage, saveLoans,
  selectIsRestored, selectStoredOffers,
  selectStoredStatus, saveStatus,
  selectStoredApplicationId,
  saveApplicationId,
  clearStorage,
} from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedOffers = useSelector(selectStoredOffers);
  const loanOffers = useSelector(selectLoanOffersArray);
  const storedStatus = useSelector(selectStoredStatus);
  const storedAppId = useSelector(selectStoredApplicationId);
  const loanStatus = useSelector(selectLoanStatus);
  const restored = useSelector(selectIsRestored);
  const applicationId = useSelector(selectAppId);
  React.useEffect(() => {
    dispatch(getStateFromStorage());
  }, []);
  React.useEffect(() => {
    restored && dispatch(saveStatus(loanStatus));
    if (loanStatus === ELoanSteps.AppClosed
      || loanStatus === ELoanSteps.ScoringRejected) {
      dispatch(denyApplication());
      dispatch(clearStorage());
    }
  }, [loanStatus]);
  React.useEffect(() => {
    restored && dispatch(saveLoans(loanOffers));
  }, [loanOffers]);
  React.useEffect(() => {
    restored && dispatch(saveApplicationId(applicationId));
  }, [applicationId]);
  React.useEffect(() => {
    if (restored) {
      dispatch(setAppId(storedAppId));
      dispatch(setStatusLoan(storedStatus));
      dispatch(setLoans(storedOffers));
    }
  }, [restored]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
