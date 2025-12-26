import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { Offer, OfferDescription } from '../../types/offers';
import { Review, NewCommentData } from '../../types/review';

export const fetchOfferById = createAsyncThunk<
  OfferDescription,
  string,
  { rejectValue: 'NOT_FOUND' | 'ERROR' }
>('offer/fetchById', async (offerId, { rejectWithValue }) => {
  try {
    const response = await api.get<OfferDescription>(`/offers/${offerId}`);
    return response.data;
  } catch {
    return rejectWithValue('ERROR');
  }
});

export const fetchNearbyOffers = createAsyncThunk<Offer[], string>(
  'offer/fetchNearby',
  async (offerId) => {
    const response = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return response.data;
  }
);

export const fetchOfferComments = createAsyncThunk<Review[], string>(
  'offer/fetchComments',
  async (offerId) => {
    const response = await api.get<Review[]>(`/comments/${offerId}`);
    return response.data;
  }
);

export const postOfferComment = createAsyncThunk<
  Review[],
  { offerId: string; data: NewCommentData }
>('offer/postComment', async ({ offerId, data }) => {
  const response = await api.post<Review[]>(`/comments/${offerId}`, data);
  return response.data;
});

export const toggleFavoriteStatus = createAsyncThunk<
  Offer,
  { offerId: string; status: 0 | 1 }
>('offer/toggleFavorite', async ({ offerId, status }) => {
  const response = await api.post<Offer>(
    `/favorite/${offerId}/${status}`
  );
  return response.data;
});
