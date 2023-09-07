import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ELoanSteps } from '../interfaces';
import { selectAppId, selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../redux/store/store';
import { ScoringForm } from '../components/scoringForm/ScoringForm';
import { Spinner } from '../components/spinner/Spinner';
import { selectIsAppLoaded } from '../redux/selectors/selectors';


const getCurrentLoanPath = (status: ELoanSteps, applicationId: number | null) => {
  switch (status) {
    case ELoanSteps.ScoringApproved: return `/loan/${applicationId}/waitingDecision`;
    case ELoanSteps.ScoringRejected: return `/loan/${applicationId}/waitingDecision`;
    case ELoanSteps.AppClosed: return '/loan';
    case ELoanSteps.PaymentsShown: return `/loan/${applicationId}/document`;
    default: return `/loan/${applicationId}`;
  }
};

export const LoanScoring: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStatus = useSelector(selectLoanStatus);
  const applicationId = useSelector(selectAppId);
  const navigate = useNavigate();
  const isScoring = currentStatus === ELoanSteps.ScoringStarted;
  const isWaiting = currentStatus === ELoanSteps.Waiting;
  const isLoaded = useSelector(selectIsAppLoaded);

  useEffect(() => {
    if (isLoaded && applicationId !== null) {
      console.log(ELoanSteps[currentStatus]);
      console.log(applicationId);
      console.log('renavigate')!;
      const currentPath = getCurrentLoanPath(currentStatus, applicationId);
      navigate(currentPath);
    }
  }, [currentStatus]);
  useEffect(() => {
    if (currentStatus === ELoanSteps.LoandSended) {
      dispatch(setStatusLoan(ELoanSteps.ScoringStarted));
    }
    if (currentStatus === ELoanSteps.AppClosed) {
      navigate('../loan');
    }
  });

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
