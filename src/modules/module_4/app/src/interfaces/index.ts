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
  'Null',
  'AppClosed',
  'Waiting',
  'AppInit',
  'PrescoringStarted',
  'WaitingPrescoringAnswer',
  'LoanOffers',
  'LoanChoosed',
  'LoansSended',
  'ScoringStarted',
  'ScoringSended',
  'StatusWaiting',
  'ScoringApproved',
  'ScoringRejected',
  'DocumentOpened',
  'DocumentAccepted',
  'DocumentsSigned',
  'SignOpened',
  'SignAccepted',
  'CodeStarted',
  'CodeSended',
  'CodeRejected',
  'CreditIssued',
  'LoanCompleted',
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

export interface IScoringDataToSend {
  gender: 'MALE' | 'FAMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employment: IEmploymentData;
  account: number | null;
}

export interface IEmploymentData {
  employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER';
  employerINN: string;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}
