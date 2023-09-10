import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { ITabsPair, TabsManager } from '../components/tabsManager/TabsManager';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';
import { CashbackTab } from '../components/cashbackTab/CashbackTab';
import { RatesConditionsTab } from '../components/ratesConditionsTab/RatesConditionsTab';
import { FAQTab } from '../components/faqTab/FAQTab';
import { HowToGetCardInfo } from '../components/howToGetCardInfo/HowToGetCardInfo';
import { ELoanSteps } from '../interfaces';
import { selectLoanStatus, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { selectIsRestored } from '../redux/slices/userStorageSlice';

const tabsArray: ITabsPair[] = [
  {
    name: 'About card',
    component: <AboutCardTab />,
  },
  {
    name: 'Rates and conditions',
    component: <RatesConditionsTab />,
  },
  {
    name: 'Cashback',
    component: <CashbackTab />,
  },
  {
    name: 'FAQ',
    component: <FAQTab />,
  },
];

export const navigateLoan = (status: ELoanSteps, navigate: NavigateFunction) => {
  console.log('navigated by loan');
  switch (status) {
    case ELoanSteps.AppInit: {
      navigate('/loan/prescoring', { replace: true });
      break;
    }
    case (ELoanSteps.LoanOffers):
    {
      navigate('/loan/loanOffers', { replace: true });
      break;
    }
    case (ELoanSteps.LoanChoosed): {
      navigate('/loan/loanOffers', { replace: true });
      break;
    }
    case ELoanSteps.LoandSended: {
      navigate('/loan/preliminaryDecision', { replace: true });
      break;
    }
    default: break;
  }
};

export const Loan: React.FC = () => {
  const currentStatus = useSelector(selectLoanStatus);
  const isRestored = useSelector(selectIsRestored);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    isRestored && navigateLoan(currentStatus, navigate);
  }, [currentStatus]);
  useEffect(() => {
    if (currentStatus === ELoanSteps.AppInit) {
      dispatch(setStatusLoan(ELoanSteps.PrescoringStarted));
    }
  }, []);
  return (
    <>
      <PlatinumCardAdv />
      <TabsManager tabsArray={ tabsArray } />
      <HowToGetCardInfo />
      <Outlet />
    </>
  );
};
