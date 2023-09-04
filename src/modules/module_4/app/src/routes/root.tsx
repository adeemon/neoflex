import * as React from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { Homepage } from './homepage';


const App: React.FC = () =>
  (
    <>
      <Header />
      <main>
        <Homepage />
      </main>
      <Footer />
    </>
  );

export default App;
