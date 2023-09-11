import { createBrowserRouter } from 'react-router-dom';
import { LoanOffersBlock } from '../components/loanOffersBlock/LoanOffersBlock';
import { PrescoringForm } from '../components/prescoringForm/PrescoringForm';
import { Homepage } from './homepage';
import { Loan } from './loan';
import { PageNotFound } from './pageNotFound';
import { PreliminaryDecision } from './preliminaryDecision';
import Root from './root';
import { WaitingDecision } from './waitingDecision';
import { DocumentPage } from './documentPage/DocumentPage';
import { DocumentsSign } from './documentsSign/DocumentsSign';
import { CodePage } from './codePage/CodePage';
import { LoanWrapper } from '../components/loanWrapper/LoanWrapper';
import { ScoringForm } from '../components/scoringForm/ScoringForm';
import { ElementFirstOpenWrapper } from '../components/elementFirstOpenWrapper/ElementFirstOpenWrapper';
import { ELoanSteps } from '../interfaces';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: 'loan',
        element: (
          <ElementFirstOpenWrapper
            previousState={ ELoanSteps.AppInit }
            newState={ ELoanSteps.PrescoringStarted }
          >
            <Loan />
          </ElementFirstOpenWrapper>
        ),
        children: [
          {
            path: 'prescoring',
            element: (<LoanWrapper><PrescoringForm /></LoanWrapper>),
          },
          {
            path: 'loanOffers',
            element: (<LoanWrapper><LoanOffersBlock /></LoanWrapper>),
          },
          {
            path: 'preliminaryDecision',
            element: (<LoanWrapper><PreliminaryDecision /></LoanWrapper>),
          },
          {
            path: ':applicationId',
            element: (
              <ElementFirstOpenWrapper
                previousState={ ELoanSteps.LoansSended }
                newState={ ELoanSteps.ScoringStarted }
              >
                <ScoringForm />
              </ElementFirstOpenWrapper>
            ),
          },
          {
            path: ':applicationId/waitingDecision',
            element: <WaitingDecision />,
          },
          {
            path: ':applicationId/document',
            element: (
              <ElementFirstOpenWrapper
                previousState={ ELoanSteps.ScoringApproved }
                newState={ ELoanSteps.DocumentOpened }
              >
                <DocumentPage />
              </ElementFirstOpenWrapper>
            ),
          },
          {
            path: ':applicationId/document/sign',
            element: (
              <ElementFirstOpenWrapper
                previousState={ ELoanSteps.DocumentsSigned }
                newState={ ELoanSteps.SignOpened }
              >
                <DocumentsSign />
              </ElementFirstOpenWrapper>
            ),
          },
          {
            path: ':applicationId/code',
            element: (
              <ElementFirstOpenWrapper
                previousState={ ELoanSteps.SignAccepted }
                newState={ ELoanSteps.CodeStarted }
              >
                <CodePage />
              </ElementFirstOpenWrapper>
            ),
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
