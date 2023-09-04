import { createSlice } from '@reduxjs/toolkit';
//  import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { IOffer } from '../../interfaces/index';
import { getApllicationListFromString } from '../../utils';

interface IUserStorage {
  isSubscribed: boolean;
  applicationsList: number[];
  offersList?: IOffer[];
}

const initialState: IUserStorage = {
  isSubscribed: false,
  applicationsList: [1],
};

const userStoragSlice = createSlice({
  name: 'userStorage',
  initialState,
  reducers: {
    getStateFromStorage: (state) => {
      state.isSubscribed = localStorage.getItem('isSubscribed') === 'true';
      const applicationsList = localStorage.getItem('applicationsList') || '';
      state.applicationsList = getApllicationListFromString(applicationsList);
    },
    subscribeUser: (state) => {
      state.isSubscribed = true;
      localStorage.setItem('isSubscribed', 'true');
      console.log('im in action');
    },
  },
});

export const selectIsSubscribed = (state: RootState) =>
  state.userStorage.isSubscribed;

export const { getStateFromStorage, subscribeUser } = userStoragSlice.actions;

export default userStoragSlice.reducer;
