import { RootState } from '../store/store';

export const selectIsAppLoaded = (state: RootState) => {
  const isCurrentAppNotNull = false || state.userStorage.currentApplication;
  const isLoansLoaded = state.loanOffers.status > 4;
  return isCurrentAppNotNull || isLoansLoaded;
};

export const selectLoanOffers = (state: RootState) =>
  state.loanOffers.response;
