import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

type Network = {
  id: string;
  name: string;
}

type AppState = {
  pending: boolean;
  error: boolean;
  account: string | null;
  network: Network | null;
}

const initialState: AppState = {
  pending: false,
  error: false,
  account: null,
  network: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
    setChain: (state, action: PayloadAction<Network>) => {
      state.network = action.payload;
    },
    logout: (state) => {
      state.account = null;
      state.network = null;
    },
  },
});

export const getPending = (state: RootState): boolean => state.app.pending;
export const getError = (state: RootState): boolean => state.app.error;
export const getAccount = (state: RootState): string | null => state.app.account;
export const getNetwork = (state: RootState): Network | null => state.app.network;
export const getLoggedIn = (state: RootState): boolean => !!state.app.account && !!state.app.network;

export const { setPending, setError, setAccount, setChain, logout } = appSlice.actions;
export const appReducer = appSlice.reducer;
