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
import { selectIsAppLoaded } from '../redux/selectors/selectors';

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


export const Loan: React.FC = () => {
  const isLoansReady = useSelector(selectIsAppLoaded);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isLoansReady);
    if (isLoansReady) {
      navigate('/loan/loanOffers');
    } else navigate('prescoring');
  }, [isLoansReady]);
  return (
    <>
      <PlatinumCardAdv />
      <TabsManager tabsArray={tabsArray} />
      <HowToGetCardInfo />
      <Outlet />
    </>
  );
};
