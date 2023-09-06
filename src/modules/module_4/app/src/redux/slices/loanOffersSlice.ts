import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IloanOffer, ELoanSteps, IScoringData } from '../../interfaces';
import { TPrescoringFormData } from '../../components/prescoringForm/PrescoringForm';
import { RootState } from '../store/store';

interface IloanOffers {
  choosedOffer: IloanOffer | null;
  status: ELoanSteps;
  response: IloanOffer[] | null;
}

const initialState: IloanOffers = {
  choosedOffer: null,
  status: ELoanSteps.Prescoring,
  response: null,
};

export interface IPostScoringSign {
  scoringData: IScoringData;
  applicationId: number;
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
    localStorage.setItem('loanOffers', JSON.stringify(result));
    localStorage.setItem('applicationId', JSON.stringify(result[0].applicationId));
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
  async (data: IPostScoringSign, thunkApi) => {
    const timeout = setTimeout(() =>
      thunkApi.rejectWithValue({ message: 'Failed to get responce' }), 10000);
    const requestPath = `http://localhost:8080/application/registration/${data.applicationId}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.scoringData),
    };
    console.log(requestOptions.body);
    console.log(requestPath);
    try {
      let result = await fetch(requestPath, requestOptions);
      let output = await result.json();
      console.log(output);
      clearTimeout(timeout);
      return output;
    } catch {
      clearTimeout(timeout);
      return thunkApi.rejectWithValue({ message: 'Failed to get responce' });
    }
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
  },
  extraReducers: (builder) => {
    builder.addCase(getLoansByPrescoring.pending, (state) => {
      state.status = ELoanSteps.WaitingPrescoringAnswer;
    });
    builder.addCase(
      getLoansByPrescoring.fulfilled,
      (state, action: PayloadAction<IloanOffer[]>) => {
        state.response = action.payload;
        state.status = ELoanSteps.GotPrescoring;
      },
    );
    builder.addCase(getLoansByPrescoring.rejected, () => {
      console.error('Ошибка в фетче предложений');
    });
    builder.addCase(postChoosedOffer.fulfilled, (state) => {
      state.status = ELoanSteps.LoanChoosed;
    });
    builder.addCase(postScoring.rejected, (state) => {
      state.status = ELoanSteps.ScoringSended;
      console.log('rejected');
    });
    builder.addCase(postScoring.pending, (state) => {
      state.status = ELoanSteps.ScoringSended;
      console.log('sended');
    });
    builder.addCase(postScoring.fulfilled, (state) => {
      state.status = ELoanSteps.ScoringSended;
      console.log('fulfiled');
    });
  },
});

export const { chooseOffer, setStatusLoan, setLoans } = loanOffersSlice.actions;
export const selectChoosedOffer = (state: RootState) =>
  state.loanOffers.choosedOffer;
export const selectLoanOffersArray = (state: RootState) =>
  state.loanOffers.response;
export const selectLoanStatus = (state: RootState) =>
  state.loanOffers.status;
export default loanOffersSlice.reducer;
