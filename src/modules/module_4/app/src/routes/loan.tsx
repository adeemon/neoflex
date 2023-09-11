import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ELoanSteps } from '../interfaces';
import { selectAppId, selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { clearStorage, selectIsRestored } from '../redux/slices/userStorageSlice';
import { Spinner } from '../components/spinner/Spinner';


export const navigateLoan = (
  status: ELoanSteps,
  applicationId: number | null,
  navigate: NavigateFunction,
) => {
  console.log('navigated by loan');
  switch (status) {
    case (ELoanSteps.AppInit): {
      navigate('/loan/prescoring', { replace: true });
      break;
    }
    case (ELoanSteps.LoanOffers):
    {
      navigate('/loan/loanOffers', { replace: true });
      break;
    }
    case (ELoanSteps.PrescoringStarted):
    {
      navigate('/loan/prescoring', { replace: true });
      break;
    }
    case (ELoanSteps.LoanChoosed): {
      navigate('/loan/loanOffers', { replace: true });
      break;
    }
    case ELoanSteps.LoansSended: {
      navigate('/loan/preliminaryDecision', { replace: true });
      break;
    }
    case (ELoanSteps.LoanCompleted): {
      navigate('/', { replace: true });
      break;
    }
    case (ELoanSteps.ScoringStarted): {
      navigate(`/loan/${applicationId}`, { replace: true });
      break;
    }
    case ELoanSteps.ScoringSended:
    case ELoanSteps.ScoringApproved:
    case ELoanSteps.ScoringRejected: {
      navigate(`/loan/${applicationId}/waitingDecision`, { replace: true });
      break;
    }
    case ELoanSteps.ScoringRejected || ELoanSteps.AppClosed: {
      navigate('/', { replace: true });
      break;
    }
    case ELoanSteps.DocumentOpened:
    case ELoanSteps.DocumentAccepted:
    case ELoanSteps.DocumentsSigned: {
      navigate(`/loan/${applicationId}/document`, { replace: true });
      break;
    }
    case ELoanSteps.SignOpened:
    case ELoanSteps.SignAccepted: {
      navigate(`/loan/${applicationId}/document/sign`, { replace: true });
      break;
    }
    case ELoanSteps.CodeStarted:
    case ELoanSteps.CodeSended:
    case ELoanSteps.CodeRejected:
    case ELoanSteps.CreditIssued: {
      navigate(`/loan/${applicationId}/code`, { replace: true });
      break;
    }
    case ELoanSteps.StatusWaiting: {
      break;
    }
    default: {
      break;
    }
  }
};

export const Loan: React.FC = () => {
  const applicationId = useSelector(selectAppId);
  const currentStatus = useSelector(selectLoanStatus);
  const isRestored = useSelector(selectIsRestored);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isWaiting = currentStatus === ELoanSteps.Waiting;
  useEffect(() => {
    console.log(currentStatus);
    console.log(localStorage);
    console.log(isRestored);
    console.log('Status =', ELoanSteps[currentStatus]);
    isRestored
      && navigateLoan(currentStatus, applicationId, navigate);
    if (currentStatus === ELoanSteps.LoanCompleted) {
      dispatch(clearStorage);
      dispatch(setStatusLoan(ELoanSteps.PrescoringStarted));
    }
  }, [currentStatus, isRestored]);
  useEffect(() => {
    if (currentStatus === ELoanSteps.AppInit) {
      dispatch(setStatusLoan(ELoanSteps.PrescoringStarted));
    }
  }, []);
  return (
    <Spinner isLoading={ isWaiting && isRestored }>
      <Outlet />
    </Spinner>
  );
};
