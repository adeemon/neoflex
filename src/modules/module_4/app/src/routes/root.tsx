import * as React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ELoanSteps } from '../interfaces';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { denyApplication, selectAppId, selectLoanStatus, setAppId, setLoans, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { getStateFromStorage, saveLoans, selectIsRestored, selectStoredOffers, selectStoredStatus, saveStatus, selectStoredApplicationId, saveApplicationId, clearStorage } from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loanOffers = useSelector(selectStoredOffers);
  const storedStatus = useSelector(selectStoredStatus);
  const storedAppId = useSelector(selectStoredApplicationId);
  const loanStatus = useSelector(selectLoanStatus);
  const restored = useSelector(selectIsRestored);
  const applicationId = useSelector(selectAppId);
  React.useEffect(() => {
    dispatch(getStateFromStorage());
    console.log(localStorage);
  }, []);
  React.useEffect(() => {
    restored && dispatch(saveStatus(loanStatus));
    if (loanStatus === ELoanSteps.AppClosed) {
      dispatch(clearStorage());
      dispatch(denyApplication({ applicationId }));
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
      dispatch(setLoans(loanOffers));
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
