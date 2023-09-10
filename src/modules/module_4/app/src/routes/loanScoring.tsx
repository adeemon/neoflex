import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ELoanSteps } from '../interfaces';
import { selectAppId, selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../redux/store/store';
import { ScoringForm } from '../components/scoringForm/ScoringForm';
import { Spinner } from '../components/spinner/Spinner';
import { navigateLoan } from './loan';
import { selectIsRestored } from '../redux/slices/userStorageSlice';


export const navigateLoanScoring = (
  status: ELoanSteps,
  applicationId: number | null,
  navigate: NavigateFunction,
) => {
  console.log('navigated by scoring');
  if (status < 6) {
    navigateLoan(status, navigate);
  } else {
    switch (status) {
      case ELoanSteps.ScoringSended: {
        navigate(`/loan/${applicationId}/waitingDecision`, { replace: true });
        break;
      }
      case ELoanSteps.ScoringRejected || ELoanSteps.AppClosed: {
        navigate('/', { replace: true });
        break;
      }
      case ELoanSteps.DocumentAccepted: {
        navigate(`/loan/${applicationId}/document/sign`, { replace: true });
        break;
      }
      default: break;
    }
  }
};

export const LoanScoring: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStatus = useSelector(selectLoanStatus);
  const applicationId = useSelector(selectAppId);
  const navigate = useNavigate();
  const isScoring = currentStatus === ELoanSteps.ScoringStarted;
  const isWaiting = currentStatus === ELoanSteps.Waiting;
  const selectRestored = useSelector(selectIsRestored);

  useEffect(() => {
    if (currentStatus === ELoanSteps.LoandSended) {
      dispatch(setStatusLoan(ELoanSteps.ScoringStarted));
    }
    selectRestored && navigateLoanScoring(currentStatus, applicationId, navigate);
  }, [currentStatus]);

  const getElementToRender = () => {
    if (isWaiting) {
      return <Spinner />;
    }
    if (isScoring) {
      return <ScoringForm />;
    }
    return <Outlet />;
  };
  return (
    <>
      { getElementToRender() }
    </>
  );
};
