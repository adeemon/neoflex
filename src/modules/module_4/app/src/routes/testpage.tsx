import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { HowToGetCardInfo } from '../components/howToGetCardInfo/HowToGetCardInfo';
import { LoanOffersBlock } from '../components/loanOffersBlock/LoanOffersBlock';



export const TestPage: React.FC = () =>
  (
    <>
      <Header />
      <main>
        <PlatinumCardAdv />
        <HowToGetCardInfo />
        <LoanOffersBlock />
      </main>
      <Footer />
    </>
  );
