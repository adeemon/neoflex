import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { getStateFromStorage } from '../redux/slices/userStorageSlice';
import { useAppDispatch } from '../redux/store/store';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getStateFromStorage());
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
