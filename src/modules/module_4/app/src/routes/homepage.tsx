import * as React from 'react';
import { useSelector } from 'react-redux';
import CardDesigns from '../components/cardDesigns/CardDesigns';
import { Exchange } from '../components/exchange/Exchange';
import { Features } from '../components/features/Features';
import { GlobalMap } from '../components/globalMap/GlobalMap';
import { News } from '../components/news/News';
import { NewsSub } from '../components/newsSub/NewsSub';
import { Support } from '../components/support/Support';
import { ELoanSteps } from '../interfaces';
import { selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { getStateFromStorage } from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';


export const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStatus = useSelector(selectLoanStatus);

  React.useEffect(() => {
    dispatch(getStateFromStorage());
    console.log(localStorage);
  }, []);
  React.useEffect(() => {
    if (currentStatus === ELoanSteps.AppClosed) {
      dispatch(setStatusLoan(ELoanSteps.Prescoring));
    }
  });
  return (
    <>
      <CardDesigns />
      <Features />
      <Exchange />
      <GlobalMap />
      <News />
      <Support />
      <NewsSub />
    </>
  );
};
