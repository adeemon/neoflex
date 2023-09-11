import * as React from 'react';
import { useSelector } from 'react-redux';
import { ELoanSteps } from '../../interfaces';
import { selectLoanStatus, setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { selectIsRestored } from '../../redux/slices/userStorageSlice';
import { useAppDispatch } from '../../redux/store/store';

interface IProps {
  children: JSX.Element | React.ReactElement | JSX.Element[] | (() => JSX.Element) | null;
  previousState: ELoanSteps;
  newState: ELoanSteps;
}

export const ElementFirstOpenWrapper: React.FC<IProps> = (
  {
    children,
    previousState,
    newState,
  },
) => {
  const dispatch = useAppDispatch();
  const currentState = useSelector(selectLoanStatus);
  const isRestored = useSelector(selectIsRestored);
  React.useEffect(() => {
    console.log('Im in wrapper');
    console.log(localStorage);
    console.log(ELoanSteps[currentState], isRestored);
    if (isRestored && previousState === currentState) {
      dispatch(setStatusLoan(newState));
    }
  }, [isRestored, currentState]);
  return (
    <>
      { isRestored && children }
    </>
  );
};
