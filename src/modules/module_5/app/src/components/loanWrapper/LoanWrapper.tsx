import * as React from 'react';
import { ITabsPair, TabsManager } from '../tabsManager/TabsManager';
import { AboutCardTab } from '../aboutCardTab/AboutCardTab';
import { CashbackTab } from '../cashbackTab/CashbackTab';
import { RatesConditionsTab } from '../ratesConditionsTab/RatesConditionsTab';
import { FAQTab } from '../faqTab/FAQTab';
import { PlatinumCardAdv } from '../platinumCardAdv/platinumCardAdv';
import { HowToGetCardInfo } from '../howToGetCardInfo/HowToGetCardInfo';

interface IProps {
  children: JSX.Element | null;
}

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

export const LoanWrapper: React.FC<IProps> = ({ children }) =>
  (
    <>
      <PlatinumCardAdv />
      <TabsManager tabsArray={ tabsArray } />
      <HowToGetCardInfo />
      { children }
    </>
  );
