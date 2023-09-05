import { RootState } from '../store/store';

export const selectIsAppLoaded = (state: RootState) => {
  const isCurrentAppNotNull = false || state.userStorage.currentApplication;
  const isLoansLoaded = state.prescoringForm.status === 'Got responce';
  return isCurrentAppNotNull || isLoansLoaded;
};

export const selectLoanOffers = (state: RootState) => {
  if (state.userStorage.currentApplication) {
    return state.userStorage.offersList;
  }
  return state.prescoringForm.response;
};
