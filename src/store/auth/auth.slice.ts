import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, AuthInfo } from '../../types/auth';
import { login, checkAuth } from './auth.thunks';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = action.payload ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
      });
  },
});

export default authSlice.reducer;
