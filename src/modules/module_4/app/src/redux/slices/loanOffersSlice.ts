import { IloanOffer } from './../../interfaces/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IloanOffer } from '../../interfaces/index';
import { TPrescoringFormData } from '../../components/prescoringForm/PrescoringForm';
import { RootState } from '../store/store';

interface IPrescoringForm {
  choosedOffer: IloanOffer | null;
  status: 'Loading' | 'Ready' | 'Got responce';
  response: IloanOffer[] | null;
}

const initialState: IPrescoringForm = {
  choosedOffer: null,
  status: 'Ready',
  response: null,
};

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
  async (data: IloanOffer, thunkApi) => {
    const requestPath = 'http://localhost:8080/application/apply';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch(requestPath, requestOptions);
  }
)

const loanOffersSlice = createSlice({
  name: 'loanOffers',
  initialState,
  reducers: {
    chooseOffer: (state, action: PayloadAction<IloanOffer>) => {
      state.choosedOffer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoansByPrescoring.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(
      getLoansByPrescoring.fulfilled,
      (state, action: PayloadAction<IloanOffer[]>) => {
        state.response = action.payload;
        state.status = 'Got responce';
      },
    );
    builder.addCase(getLoansByPrescoring.rejected, () => {
      console.error('Ошибка в фетче предложений');
    });
  },
});

export const selectPrescoringLoansArray = (state: RootState) =>
  state.prescoringForm.response;
export const selectPrescoringFormStatus = (state: RootState) =>
  state.prescoringForm.status;
export default loanOffersSlice.reducer;
