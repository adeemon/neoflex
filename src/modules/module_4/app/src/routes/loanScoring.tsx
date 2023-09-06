import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ELoanSteps } from '../interfaces';
import { selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { selectCurrentApplicationId } from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';
import { ScoringForm } from '../components/scoringForm/ScoringForm';


const getCurrentLoanPath = (status: ELoanSteps, applicationId: number | null) => {
  switch (status) {
    case ELoanSteps.ScoringSended: return `/loan/${applicationId}/waitingDecision`;
    case ELoanSteps.ScoringRejected: return `/loan/${applicationId}/waitingDecision`;
    default: return `/loan/${applicationId}`;
  }
};

export const LoanScoring: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStatus = useSelector(selectLoanStatus);
  const appId = useSelector(selectCurrentApplicationId);
  const navigate = useNavigate();
  const isScoring = currentStatus === ELoanSteps.ScoringStarted;
  useEffect(() => {
    console.log(ELoanSteps[currentStatus]);
    console.log('renavigate')!;
    const currentPath = getCurrentLoanPath(currentStatus, appId);
    navigate(currentPath);
  }, [navigate]);
  useEffect(() => {
    dispatch(setStatusLoan(ELoanSteps.ScoringStarted));
  });
  return (
    <>
      { isScoring
        ? <ScoringForm />
        : <Outlet /> }
    </>
  );
};
