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
  const isRestored = useSelector(selectIsRestored);
  const applicationId = useSelector(selectAppId);
  const [restored, setIsRestored] = React.useState(false);
  React.useEffect(() => {
    console.log();
    console.log(localStorage);
    dispatch(getStateFromStorage());
  }, []);
  React.useEffect(() => {
    if (isRestored) {
      dispatch(setAppId(storedAppId));
      dispatch(setStatusLoan(storedStatus));
      dispatch(setLoans(storedOffers));
      setIsRestored(true);
    }
  }, [isRestored]);
  React.useEffect(() => {
    isRestored && dispatch(saveStatus(loanStatus));
    if (loanStatus === ELoanSteps.AppClosed
      || loanStatus === ELoanSteps.ScoringRejected) {
      dispatch(denyApplication());
      dispatch(clearStorage());
    }
  }, [loanStatus]);
  React.useEffect(() => {
    isRestored && dispatch(saveLoans(loanOffers));
  }, [loanOffers]);
  React.useEffect(() => {
    isRestored && dispatch(saveApplicationId(applicationId));
  }, [applicationId]);
  return (
    <>
      <Header />
      <main>
        { restored && isRestored && <Outlet /> }
      </main>
      <Footer />
    </>
  );
};

export default App;
