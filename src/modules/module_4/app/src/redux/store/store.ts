import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import loanOffersReducer from '../slices/loanOffersSlice';
import userStorageReducer from '../slices/userStorageSlice';

export const store = configureStore({
  reducer: {
    userStorage: userStorageReducer,
    loanOffers: loanOffersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// prettier-ignore
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();
