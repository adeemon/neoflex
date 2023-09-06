export interface IloanOffer {
  applicationId: number | null;
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
  'WaitingPrescoringAnswer',
  'GotPrescoring',
  'LoanOffers',
  'LoanChoosed',
  'LoandSended',
  'ScoringStarted',
  'ScoringSended',
  'ScoringRejected',
}

export interface IScoringData {
  gender: 'MALE' | 'FAMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER';
  employerINN: number;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}