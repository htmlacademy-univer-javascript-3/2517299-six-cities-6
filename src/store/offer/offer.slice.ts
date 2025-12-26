import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferDescription } from '../../types/offers';
import { Review } from '../../types/review';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchOfferComments,
  postOfferComment,
} from './offer.thunks';

type OfferState = {
  currentOffer: OfferDescription | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isNotFound: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isNotFound: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isNotFound = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isNotFound = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postOfferComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export default offerSlice.reducer;
