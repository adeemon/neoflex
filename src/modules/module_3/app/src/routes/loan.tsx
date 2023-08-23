import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';
import { RatesConditions } from '../components/ratesConditions/RatesConditions';

export const Loan: React.FC = () => {
  return (
    <>
        <Header />
        <main>
            <PlatinumCardAdv />
            <RatesConditions />
        </main>
        <Footer />
    </>
  );
}
