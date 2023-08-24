import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { ITabsPair, TabsManager } from '../components/tabsManager/TabsManager';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';
import { CashbackTab } from '../components/cashbackTab/CashbackTab';
import { RatesConditionsTab } from '../components/ratesConditionsTab/RatesConditionsTab';
import { FAQTab } from '../components/faqTab/FAQTab';
import { HowToGetCardInfo } from '../components/howToGetCardInfo/HowToGetCardInfo';
import { PrescoringForm } from '../components/prescoringForm/PrescoringForm';

const tabsArray:Array<ITabsPair> = [
  { 
    name:'About card',
    component: <AboutCardTab />
  },
  {
    name: 'Rates and conditions',
    component: <RatesConditionsTab />
  },
  {
    name: 'Cashback',
    component: <CashbackTab />
  },
  {
    name: 'FAQ',
    component: <FAQTab />
  },
]


export const Loan: React.FC = () => {
  return (
    <>
        <Header />
        <main>
            <PlatinumCardAdv />
            <TabsManager tabsArray={tabsArray}/>
            <HowToGetCardInfo />
            <PrescoringForm />
        </main>
        <Footer />
    </>
  );
}
