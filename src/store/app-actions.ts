import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers } from './reducer';
import { Offer, OfferDescription } from '../types/offers';
import { api } from '../services/api';
import { NewCommentData, Review } from '../types/review';

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
>('app/toggleFavoriteStatus', async ({ offerId, status }, { rejectWithValue }) => {
  try {
    const response = await api.post<Offer>(`/six-cities/favorite/${offerId}/${status}`);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to update favorite status');
  }
});
