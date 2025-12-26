import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, AuthInfo } from '../../types/auth';
import { login, checkAuth } from './auth.thunks';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: AuthState = {
  authorizationStatus: 'NO_AUTH',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = 'AUTH';
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = 'NO_AUTH';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = action.payload ? 'AUTH' : 'NO_AUTH';
      });
  },
});

export default authSlice.reducer;
