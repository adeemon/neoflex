import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IloanOffer } from '../../interfaces/index';
import { TPrescoringFormData } from '../../components/prescoringForm/PrescoringForm';
import { RootState } from '../store/store';

interface IPrescoringForm {
  data: TPurePresconingData;
  status: 'Loading' | 'Ready' | 'Got responce';
  response: IloanOffer[] | null;
}

interface TPurePresconingData {
  lastName: string;
  firstName: string;
  middleName: string | null | undefined;
  email: string;
  birthdate: string;
  term: string;
  passportNumber: number;
  passportSeries: number;
  amount: number;
}

const initialState: IPrescoringForm = {
  data: {
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    birthdate: '2023-09-05',
    term: '',
    passportNumber: 1111,
    passportSeries: 111111,
    amount: 200000,
  },
  status: 'Ready',
  response: null,
};

export const getLoansByPrescoring = createAsyncThunk(
  'prescoringForm/getLoans',
  async (data: TPrescoringFormData, thunkApi) => {
    const requestPath = 'http://localhost:8080/application';
    const requestOpstions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const response = await fetch(requestPath, requestOpstions);
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

const prescoringFormSlice = createSlice({
  name: 'prescoringForm',
  initialState,
  reducers: {},
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
export default prescoringFormSlice.reducer;
