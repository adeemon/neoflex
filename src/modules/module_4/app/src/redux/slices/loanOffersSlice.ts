import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPostLoanTypeData } from '../../components/prescoringForm/PrescoringForm';
import { IloanOffer, ELoanSteps, IScoringDataToSend } from '../../interfaces';
import { RootState } from '../store/store';

interface IloanOffers {
  applicationId: number | null;
  choosedOffer: IloanOffer | null;
  status: ELoanSteps;
  response: IloanOffer[];
  payments: IPaymentSheduleNote[] | null;
}

const initialState: IloanOffers = {
  applicationId: null,
  choosedOffer: null,
  status: ELoanSteps.AppInit,
  response: [],
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

export interface ICodeApiResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

export const getLoansByPrescoring = createAsyncThunk(
  'loanOffers/getLoans',
  async (data: TPostLoanTypeData, thunkApi) => {
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

export const getStatusFromApi = createAsyncThunk<
IAppFromApiResponse,
void,
{ state: RootState }
>('loanOffers/getStatusFromApi', async (_: void, { getState }) => {
  const requestPath = 'http://localhost:8080/'
    + `admin/application/${getState().loanOffers.applicationId}`;
  const result = await fetch(requestPath);
  const output = (await result.json()) as IAppFromApiResponse;
  return output;
});

export const denyApplication = createAsyncThunk<
void,
void,
{ state: RootState }
>('loanOffers/denyApp', async (_: void, { getState }) => {
  const requestPath = 'http://localhost:8080/application/'
    + `${getState().loanOffers.applicationId}/deny`;
  const requestOptions = {
    method: 'POST',
  };
  fetch(requestPath, requestOptions);
});

export const formDocuments = createAsyncThunk<void, void, { state: RootState }>(
  'loanOffers/formDocs',
  async (_: void, { getState }) => {
    const appId = getState().loanOffers.applicationId;
    const requestPath = `http://localhost:8080/document/${appId}`;
    const requestOptions = {
      method: 'POST',
    };
    const result = await fetch(requestPath, requestOptions);
    const resultToRet = await result.json();
    return resultToRet;
  },
);

export const signDocuments = createAsyncThunk<void, void, { state: RootState }>(
  'loanOffers/signDocs',
  async (_: void, { getState }) => {
    const appId = getState().loanOffers.applicationId;
    const requestPath = `http://localhost:8080/document/${appId}/sign`;
    const requestOptions = {
      method: 'POST',
    };
    const result = await fetch(requestPath, requestOptions);
    const resultToRet = await result.json();
    return resultToRet;
  },
);

export const postCode = createAsyncThunk<
ICodeApiResponse,
string,
{ state: RootState }
>('loanOffers/postCode', async (code: string, { getState }) => {
  const appId = getState().loanOffers.applicationId;
  const requestPath = `http://localhost:8080/document/${appId}/sign/code`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: code,
  };
  const result = await fetch(requestPath, requestOptions);
  const output = (await result.json()) as ICodeApiResponse;
  return output;
  // console.log(result.status);
  // console.log(await (await result).json());
  // if (result.status === 200) {
  //   console.log('Done!');
  //   return result.json();
  // }
  // if (result.status === 415) {
  //   console.log(result.status);
  //   console.log('415');
  // }
  // if (result.status !== 200) {
  //   console.log(result.status, typeof result.status);
  //   console.log('!200');
  // }
});

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
        state.status = ELoanSteps.LoanOffers;
      },
    );
    builder.addCase(getLoansByPrescoring.rejected, () => {
      console.error('Ошибка в фетче предложений');
    });
    builder.addCase(postChoosedOffer.fulfilled, (state) => {
      console.log('Произошел футч');
      state.status = ELoanSteps.LoansSended;
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
      state.status = ELoanSteps.AppInit;
      state.applicationId = null;
      state.response = [];
    });
    builder.addCase(denyApplication.rejected, (state) => {
      state.status = ELoanSteps.AppInit;
      state.applicationId = null;
      state.response = [];
    });
    builder.addCase(getStatusFromApi.pending, (state) => {
      state.status = ELoanSteps.StatusWaiting;
    });
    builder.addCase(
      getStatusFromApi.fulfilled,
      (state, action: PayloadAction<IAppFromApiResponse>) => {
        if (action.payload.status === 'CC_DENIED') {
          state.status = ELoanSteps.AppClosed;
        }
        if (action.payload.status === 'CC_APPROVED') {
          state.status = ELoanSteps.ScoringApproved;
        }
        if (action.payload.status === 'CREDIT_ISSUED') {
          state.status = ELoanSteps.CreditIssued;
        }
        if (action.payload.credit) {
          state.payments = action.payload.credit.paymentSchedule;
        }
      },
    );
    builder.addCase(formDocuments.fulfilled, (state) => {
      state.status = ELoanSteps.DocumentAccepted;
    });
    builder.addCase(formDocuments.rejected, (state) => {
      state.status = ELoanSteps.DocumentsSigned;
    });
    builder.addCase(formDocuments.pending, (state) => {
      state.status = ELoanSteps.StatusWaiting;
    });
    builder.addCase(signDocuments.fulfilled, (state) => {
      state.status = ELoanSteps.SignAccepted;
    });
    builder.addCase(signDocuments.rejected, (state) => {
      state.status = ELoanSteps.SignAccepted;
    });
    builder.addCase(
      postCode.fulfilled,
      (state) => {
        state.status = ELoanSteps.CodeRejected;
      },
    );
    builder.addCase(postCode.pending, (state) => {
      state.status = ELoanSteps.StatusWaiting;
    });
    builder.addCase(postCode.rejected, (state) => {
      state.status = ELoanSteps.CreditIssued;
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
export const selectIsLoading = (state: RootState) =>
  state.loanOffers.status === ELoanSteps.StatusWaiting;
export default loanOffersSlice.reducer;
