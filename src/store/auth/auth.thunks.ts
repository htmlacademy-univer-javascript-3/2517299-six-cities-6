import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, TOKEN_KEY } from '../../services/api';
import { AuthInfo, LoginData, LoginResponse } from '../../types/auth';

export const login = createAsyncThunk<void, LoginData, { rejectValue: string }>(
  'auth/login',
  async (authData, { rejectWithValue }) => {
    try {
      const response = await api.post<LoginResponse>('/login', authData);

      localStorage.setItem(TOKEN_KEY, response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return rejectWithValue('Invalid credentials');
      }

      return rejectWithValue('Login failed');
    }
  }
);

export const checkAuth = createAsyncThunk<AuthInfo | null>(
  'auth/checkAuth',
  async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    api.defaults.headers.common['X-Token'] = token;

    const response = await api.get<AuthInfo>('/login');
    return response.data;
  }
);
