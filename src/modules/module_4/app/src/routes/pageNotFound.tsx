import * as React from 'react';
import { Error404 } from '../components/error404/Error404';
import Footer from '../layout/Footer';
import Header from '../layout/Header';


export const PageNotFound: React.FC = () => (
    <>
        <Header />
        <Error404 />
        <Footer />
    </>
);