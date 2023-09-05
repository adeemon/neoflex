
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//  import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IloanOffer, ELoanSteps } from '../../interfaces/index';

interface IUserStorage {
  isSubscribed: boolean;
  currentApplication: number | null;
  applicationsList: number[];
  offersList: IloanOffer[];
  status: ELoanSteps;
}

const initialState: IUserStorage = {
  isSubscribed: false,
  currentApplication: null,
  applicationsList: [],
  offersList: [],
  status: ELoanSteps.Prescoring,
};

const userStoragSlice = createSlice({
  name: 'userStorage',
  initialState,
  reducers: {
    getStateFromStorage: (state) => {
      const localSAppId = localStorage.getItem('applicationId');
      const localSLoanOffers = localStorage.getItem('loanOffers');
      if (localSAppId) {
        state.currentApplication = Number.parseInt(localSAppId, 10);
      }
      if (localSLoanOffers) {
        const offers = JSON.parse(localSLoanOffers) as IloanOffer[];
        state.offersList = offers;
      }
    },
    subscribeUser: (state) => {
      state.isSubscribed = true;
      localStorage.setItem('isSubscribed', 'true');
    },
    putApplicationId: (state, action: PayloadAction<number>) => {
      state.currentApplication = action.payload;
    },
    pushOffer: (state, action: PayloadAction<IloanOffer>) => {
      state.offersList.push(action.payload);
    },
    closeApplication: (state) => {
      if (state.currentApplication) {
        state.applicationsList.push(state.currentApplication);
      }
      state.currentApplication = null;
      state.offersList = [];
    },
  },
});

export const selectCurrentOffers = (state: RootState) =>
  state.userStorage.offersList;
export const selectIsSubscribed = (state: RootState) =>
  state.userStorage.isSubscribed;

export const selectCurrentApplicationId = (state: RootState) =>
  state.userStorage.currentApplication;

export const {
  getStateFromStorage,
  subscribeUser,
  putApplicationId,
  pushOffer,
} = userStoragSlice.actions;

export default userStoragSlice.reducer;
