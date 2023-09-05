import { createBrowserRouter } from 'react-router-dom';
import { LoanOffersBlock } from '../components/loanOffersBlock/LoanOffersBlock';
import { PrescoringForm } from '../components/prescoringForm/PrescoringForm';
import { Homepage } from './homepage';
import { Loan } from './loan';
import { PageNotFound } from './pageNotFound';
import Root from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
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
      {
        path: '',
        element: <Homepage />,
      },
    ],
  },
  {
    path: 'loan',
    element: <Loan />,
  },
]);
