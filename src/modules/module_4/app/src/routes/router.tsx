import { createBrowserRouter } from 'react-router-dom';
import { LoanOffersBlock } from '../components/loanOffersBlock/LoanOffersBlock';
import { PrescoringForm } from '../components/prescoringForm/PrescoringForm';
import { Homepage } from './homepage';
import { Loan } from './loan';
import { LoanScoring } from './loanScoring';
import { PageNotFound } from './pageNotFound';
import { PreliminaryDecision } from './preliminaryDecision';
import Root from './root';
import { WaitingDecision } from './waitingDecision';
import { DocumentPage } from './documentPage/DocumentPage';
import { DocumentsSign } from './documentsSign/DocumentsSign';
import { CodePage } from './codePage/CodePage';

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
          {
            path: 'preliminaryDecision',
            element: <PreliminaryDecision />,
          },
        ],
      },
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'loan/:applicationId',
        element: <LoanScoring />,
        children: [
          {
            path: '/loan/:applicationId/waitingDecision',
            element: <WaitingDecision />,
          },
          {
            path: '/loan/:applicationId/document',
            element: <DocumentPage />,
          },
          {
            path: '/loan/:applicationId/document/sign',
            element: <DocumentsSign />,
          },
          {
            path: '/loan/:applicationId/code',
            element: <CodePage />,
          },
        ],
      },
    ],
  },
  {
    path: 'loan',
    element: <Loan />,
  },
]);
