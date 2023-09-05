import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import prescoringFormReducer from '../slices/prescoringFormSlice';
import userStorageReducer from '../slices/userStorageSlice';

export const store = configureStore({
  reducer: {
    userStorage: userStorageReducer,
    prescoringForm: prescoringFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// prettier-ignore
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();
