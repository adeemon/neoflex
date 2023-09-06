import * as React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { setLoans, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { getStateFromStorage, selectCurrentApplicationId, selectStoredOffers, selectStoredStatus } from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appId = useSelector(selectCurrentApplicationId);
  const loanOffers = useSelector(selectStoredOffers);
  const storedStatus = useSelector(selectStoredStatus);
  React.useEffect(() => {
    dispatch(getStateFromStorage());
    dispatch(setStatusLoan(storedStatus));
    dispatch(setLoans(loanOffers));
    console.log(appId);
  }, [appId]);
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
