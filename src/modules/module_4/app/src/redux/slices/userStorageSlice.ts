import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//  import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IloanOffer, ELoanSteps } from '../../interfaces';

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
      const localSStatus = localStorage.getItem('status');
      if (localSStatus) {
        state.status = JSON.parse(localSStatus) as ELoanSteps;
        console.log('Статус обновлен из локал стора');
      }
      if (localSAppId) {
        state.currentApplication = Number.parseInt(localSAppId, 10);
        console.log('Id восстановлено из локал стора');
      }
      if (localSLoanOffers) {
        const offers = JSON.parse(localSLoanOffers) as IloanOffer[];
        state.offersList = offers;
        console.log('Предложения восстановлены из локал стора');
      }
      state.isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    },
    subscribeUser: (state) => {
      state.isSubscribed = true;
      localStorage.setItem('isSubscribed', 'true');
    },
    setApplicationId: (state, action: PayloadAction<number>) => {
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
    setStatus: (state, action: PayloadAction<ELoanSteps>) => {
      state.status = action.payload;
      console.log(`status changed to ${action.payload}`);
      localStorage.setItem('status', `${state.status}`);
    },
  },
});

export const selectStoredOffers = (state: RootState) =>
  state.userStorage.offersList;
export const selectIsSubscribed = (state: RootState) =>
  state.userStorage.isSubscribed;
export const selectStoredStatus = (state: RootState) =>
  state.userStorage.status;
export const selectCurrentApplicationId = (state: RootState) =>
  state.userStorage.currentApplication;

export const {
  getStateFromStorage,
  subscribeUser,
  setApplicationId,
  pushOffer,
  setStatus,
} = userStoragSlice.actions;

export default userStoragSlice.reducer;
