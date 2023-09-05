import { createBrowserRouter } from 'react-router-dom';
import { LoanOffersBlock } from '../components/loanOffersBlock/LoanOffersBlock';
import { PrescoringForm } from '../components/prescoringForm/PrescoringForm';
import { Loan } from './loan';
import { PageNotFound } from './pageNotFound';
import Root from './root';


export const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  errorElement: <PageNotFound />,
},
{
  path: 'loan',
  element: <Loan />,
  children: [
    {
      path: 'prescoring',
      element: <PrescoringForm />,
    },
    {
      path: 'loanOffers',
      element: <LoanOffersBlock />,
    },
  ],
},
]);
