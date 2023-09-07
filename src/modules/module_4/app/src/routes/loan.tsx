import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { ITabsPair, TabsManager } from '../components/tabsManager/TabsManager';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';
import { CashbackTab } from '../components/cashbackTab/CashbackTab';
import { RatesConditionsTab } from '../components/ratesConditionsTab/RatesConditionsTab';
import { FAQTab } from '../components/faqTab/FAQTab';
import { HowToGetCardInfo } from '../components/howToGetCardInfo/HowToGetCardInfo';
import { ELoanSteps } from '../interfaces';
import { selectLoanStatus } from '../redux/slices/loanOffersSlice';

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

const getCurrentLoanPath = (status: ELoanSteps) => {
  switch (status) {
    case ELoanSteps.Prescoring: return 'prescoring';
    case ELoanSteps.WaitingPrescoringAnswer: return 'prescoring';
    case ELoanSteps.GotPrescoring: return '/loan/loanOffers';
    case ELoanSteps.LoanChoosed: return '/loan/loanOffers';
    case ELoanSteps.LoandSended: return '/loan/preliminaryDecision';
    case ELoanSteps.AppClosed: return '/';
    default: return '/loan/preliminaryDecision';
  }
};

export const Loan: React.FC = () => {
  const currentStatus = useSelector(selectLoanStatus);
  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = getCurrentLoanPath(currentStatus);
    navigate(currentPath);
  }, [currentStatus]);
  return (
    <>
      <PlatinumCardAdv />
      <TabsManager tabsArray={tabsArray} />
      <HowToGetCardInfo />
      <Outlet />
    </>
  );
};
