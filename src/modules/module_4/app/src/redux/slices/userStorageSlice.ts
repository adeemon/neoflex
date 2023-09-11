import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IloanOffer, ELoanSteps } from '../../interfaces';

interface IUserStorage {
  isSubscribed: boolean;
  currentApplication: number | null;
  offersList: IloanOffer[];
  status: ELoanSteps;
  isRestored: boolean;
}

const initialState: IUserStorage = {
  isSubscribed: false,
  currentApplication: null,
  offersList: [],
  status: ELoanSteps.Null,
  isRestored: false,
};

const userStoragSlice = createSlice({
  name: 'userStorage',
  initialState,
  reducers: {
    getStateFromStorage: (state) => {
      const localSAppId = localStorage.getItem('applicationId');
      const localSLoanOffers = localStorage.getItem('loanOffers');
      const localSStatus = localStorage.getItem('status');
      if (localSStatus) {
        state.status = JSON.parse(localSStatus) as ELoanSteps;
      } else {
        state.status = ELoanSteps.AppInit;
      }
      if (localSAppId) {
        state.currentApplication = Number.parseInt(localSAppId, 10);
      }
      if (localSLoanOffers) {
        const offers = JSON.parse(localSLoanOffers) as IloanOffer[];
        state.offersList = offers;
      }
      state.isSubscribed = localStorage.getItem('isSubscribed') === 'true';
      state.isRestored = true;
    },
    subscribeUser: (state) => {
      state.isSubscribed = true;
      localStorage.setItem('isSubscribed', 'true');
    },
    saveApplicationId: (state, action: PayloadAction<number | null>) => {
      state.currentApplication = action.payload;
      localStorage.setItem('applicationId', `${action.payload}`);
    },
    pushOffer: (state, action: PayloadAction<IloanOffer>) => {
      state.offersList.push(action.payload);
    },
    saveStatus: (state, action: PayloadAction<ELoanSteps>) => {
      state.status = action.payload;
      localStorage.setItem('status', `${state.status}`);
    },
    saveLoans: (state, action: PayloadAction<IloanOffer[]>) => {
      state.offersList = action.payload;
      localStorage.setItem('loanOffers', JSON.stringify(action.payload));
    },
    clearStorage: (state) => {
      localStorage.clear();
      state.currentApplication = null;
      state.offersList = [];
    },
  },
});

export const selectStoredOffers = (state: RootState) =>
  state.userStorage.offersList;
export const selectIsSubscribed = (state: RootState) =>
  state.userStorage.isSubscribed;
export const selectStoredStatus = (state: RootState) =>
  state.userStorage.status;
export const selectStoredApplicationId = (state: RootState) =>
  state.userStorage.currentApplication;
export const selectIsRestored = (state: RootState) =>
  state.userStorage.isRestored === true;
export const {
  getStateFromStorage,
  subscribeUser,
  saveApplicationId,
  pushOffer,
  saveStatus,
  saveLoans,
  clearStorage,
} = userStoragSlice.actions;

export default userStoragSlice.reducer;
