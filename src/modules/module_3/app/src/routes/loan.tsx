import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';
import { RatesConditions } from '../components/ratesConditions/RatesConditions';
import { CashbackTab } from '../components/cashbackTab/CashbackTab';
import { FAQTab } from '../components/faqTab/FAQTab';

export const Loan: React.FC = () => {
  return (
    <>
        <Header />
        <main>
            <PlatinumCardAdv />
            <FAQTab />
        </main>
        <Footer />
    </>
  );
}
