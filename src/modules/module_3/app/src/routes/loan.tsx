import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { PlatinumCardAdv } from '../components/platinumCardAdv/platinumCardAdv';
import { TabsManager } from '../components/tabsManager/TabsManager';

export const Loan: React.FC = () => {
  return (
    <>
        <Header />
        <main>
            <PlatinumCardAdv />
            <TabsManager />
        </main>
        <Footer />
    </>
  );
}
