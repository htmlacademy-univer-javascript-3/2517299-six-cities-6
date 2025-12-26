import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { api } from '../../services/api';

export const fetchOffers = createAsyncThunk<Offer[]>(
  'offers/fetchOffers',
  async () => {
    const response = await api.get<Offer[]>('/offers');
    return response.data;
  }
);

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
