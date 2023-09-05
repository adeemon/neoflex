export interface IloanOffer {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

export enum ELoanSteps {
  'Prescoring',
  'LoanOffers',
  'LoanChoosed',
}
