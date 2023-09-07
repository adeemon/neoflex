import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IloanOffer, ELoanSteps, IScoringDataToSend } from '../../interfaces';
import { TPrescoringFormData } from '../../components/prescoringForm/PrescoringForm';
import { RootState } from '../store/store';

interface IloanOffers {
  applicationId: number | null;
  choosedOffer: IloanOffer | null;
  status: ELoanSteps;
  response: IloanOffer[] | null;
  payments: IPaymentSheduleNote[] | null;
}

const initialState: IloanOffers = {
  applicationId: null,
  choosedOffer: null,
  status: ELoanSteps.Prescoring,
  response: null,
  payments: [],
};

export interface IPostScoringSign {
  scoringData: IScoringDataToSend;
  applicationId: number;
}

export interface IDenySign {
  applicationId: number | null;
}

export interface IPaymentSheduleNote {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

export interface ICreditInfo {
  amount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  psk: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  paymentSchedule: IPaymentSheduleNote[] | null;
}

export interface IAppFromApiResponse {
  client: object;
  creationDate: string;
  credit: ICreditInfo | null;
  id: number;
  sesCode: string | null;
  signDate: string | null;
  status: string;
  statusHistory: object[];
}
export const getLoansByPrescoring = createAsyncThunk(
  'loanOffers/getLoans',
  async (data: TPrescoringFormData, thunkApi) => {
    const requestPath = 'http://localhost:8080/application';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const response = await fetch(requestPath, requestOptions);
    const result = (await response.json()) as IloanOffer[];
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to get loans',
      });
    }
    return result;
  },
);

export const postChoosedOffer = createAsyncThunk(
  'loanOffers/postOffer',
  async (offer: IloanOffer | null) => {
    const requestPath = 'http://localhost:8080/application/apply';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer),
    };
    fetch(requestPath, requestOptions);
  },
);

export const postScoring = createAsyncThunk(
  'loanOffers/postScoring',
  async (data: IPostScoringSign) => {
    const requestPath = `http://localhost:8080/application/registration/${data.applicationId}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.scoringData),
    };
    fetch(requestPath, requestOptions);
  },
);

export const getStatusFromApi = createAsyncThunk(
  'loanOffers/getStatusFromApi',
  async (appId: number | null) => {
    const requestPath = `http://localhost:8080/admin/application/${appId}`;
    let result = await fetch(requestPath);
    let output = await result.json() as IAppFromApiResponse;
    return output;
  },
);

export const denyApplication = createAsyncThunk(
  'loanOffers/denyApp',
  async (data: IDenySign) => {
    const requestPath = `http://localhost:8080/application/${data.applicationId}/deny`;
    const requestOptions = {
      method: 'POST',
    };
    fetch(requestPath, requestOptions);
  },
);

const loanOffersSlice = createSlice({
  name: 'loanOffers',
  initialState,
  reducers: {
    chooseOffer: (state, action: PayloadAction<IloanOffer>) => {
      state.choosedOffer = action.payload;
    },
    setStatusLoan: (state, action: PayloadAction<ELoanSteps>) => {
      state.status = action.payload;
    },
    setLoans: (state, action: PayloadAction<IloanOffer[]>) => {
      state.response = action.payload;
    },
    setAppId: (state, action: PayloadAction<number | null>) => {
      state.applicationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoansByPrescoring.pending, (state) => {
      state.status = ELoanSteps.WaitingPrescoringAnswer;
    });
    builder.addCase(
      getLoansByPrescoring.fulfilled,
      (state, action: PayloadAction<IloanOffer[]>) => {
        state.response = action.payload;
        state.applicationId = action.payload[0].applicationId;
        state.status = ELoanSteps.GotPrescoring;
      },
    );
    builder.addCase(getLoansByPrescoring.rejected, () => {
      console.error('Ошибка в фетче предложений');
    });
    builder.addCase(postChoosedOffer.fulfilled, (state) => {
      state.status = ELoanSteps.LoandSended;
    });
    builder.addCase(postScoring.rejected, (state) => {
      state.status = ELoanSteps.AppClosed;
    });
    builder.addCase(postScoring.pending, (state) => {
      state.status = ELoanSteps.ScoringSended;
    });
    builder.addCase(postScoring.fulfilled, (state) => {
      state.status = ELoanSteps.ScoringApproved;
    });
    builder.addCase(denyApplication.fulfilled, (state) => {
      state.status = ELoanSteps.AppClosed;
      state.applicationId = null;
      state.response = [];
    });
    builder.addCase(getStatusFromApi.fulfilled, (state, action: PayloadAction<IAppFromApiResponse>) => {
      if (action.payload.status === 'CC_DENIED') {
        state.status = ELoanSteps.AppClosed;
      }
      if (action.payload.status === 'CC_APPROVED') {
        state.status = ELoanSteps.PaymentsShown;
      }
      if (action.payload.credit) {
        state.payments = action.payload.credit.paymentSchedule;
      }
    });
  },
});

export const { chooseOffer, setStatusLoan, setLoans, setAppId } = loanOffersSlice.actions;
export const selectAppId = (state: RootState) =>
  state.loanOffers.applicationId;
export const selectChoosedOffer = (state: RootState) =>
  state.loanOffers.choosedOffer;
export const selectLoanOffersArray = (state: RootState) =>
  state.loanOffers.response;
export const selectLoanStatus = (state: RootState) =>
  state.loanOffers.status;
export const selectPayments = (state: RootState) =>
  state.loanOffers.payments;
export default loanOffersSlice.reducer;
