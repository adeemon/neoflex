import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { AboutCardTab } from '../components/aboutCardTab/AboutCardTab';

export const Loan: React.FC = () => {
  return (
    <>
        <Header />
        <main>
            <PlatinumCardAdv />
            <AboutCardTab />
        </main>
        <Footer />
    </>
  );
}
