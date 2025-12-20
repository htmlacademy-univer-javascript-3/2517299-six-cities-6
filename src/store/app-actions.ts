import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthorizationStatus, setCurrentUser, setOffers } from './reducer';
import { Offer, OfferDescription } from '../types/offers';
import { api, TOKEN_KEY } from '../services/api';
import { NewCommentData, Review } from '../types/review';
import { AuthInfo, LoginData, LoginResponse } from '../types/auth';

export const fetchOffers = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('app/fetchOffers', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.get<Offer[]>('/offers');
    dispatch(setOffers(response.data));
  } catch (error) {
    return rejectWithValue('Failed to load offers');
  }
});

export const fetchOfferById = createAsyncThunk<OfferDescription, string>(
  'app/fetchOfferById',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferDescription>(`/offers/${offerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch offer');
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string>(
  'app/fetchNearbyOffers',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch nearby offers');
    }
  }
);

export const fetchOfferCommentsById = createAsyncThunk<Review[], string>(
  'app/fetchOfferCommentsById',
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await api.get<Review[]>(`/comments/${offerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch offer comments');
    }
  }
);

export const postOfferComment = createAsyncThunk<
  Review[],
  { offerId: string; data: NewCommentData },
  { rejectValue: string }
>('app/postOfferComment', async ({ offerId, data }, { rejectWithValue }) => {
  try {
    const response = await api.post<Review[]>(`/comments/${offerId}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to post comment');
  }
});

export const fetchFavoriteOffers = createAsyncThunk<Offer[]>(
  'app/fetchFavoriteOffers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Offer[]>('/favorite');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch favorite offers');
    }
  }
);

export const toggleFavoriteStatus = createAsyncThunk<
  Offer,
  { offerId: string; status: 0 | 1 }
>(
  'app/toggleFavoriteStatus',
  async ({ offerId, status }, { rejectWithValue }) => {
    try {
      const response = await api.post<Offer>(`/favorite/${offerId}/${status}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update favorite status');
    }
  }
);

export const login = createAsyncThunk<void, LoginData>(
  'app/login',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<LoginResponse>('/login', authData);

      const token = response.data.token;
      localStorage.setItem(TOKEN_KEY, token);

      dispatch(setAuthorizationStatus('AUTH'));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(setAuthorizationStatus('NO_AUTH'));
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const checkAuth = createAsyncThunk<void>(
  'app/checkAuth',
  async (_, { dispatch }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      dispatch(setCurrentUser(null));
      return;
    }

    try {
      api.defaults.headers.common['X-Token'] = token;

      const response = await api.get<AuthInfo>('/login');
      dispatch(setAuthorizationStatus('AUTH'));
      dispatch(setCurrentUser(response.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dispatch(setAuthorizationStatus('NO_AUTH'));
        dispatch(setCurrentUser(null));
      }
    }
  }
);
