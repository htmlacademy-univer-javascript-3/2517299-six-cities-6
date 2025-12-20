import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer, OfferDescription } from '../types/offers';
import {
  fetchFavoriteOffers,
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferCommentsById,
  postOfferComment,
  toggleFavoriteStatus,
} from './app-actions';
import { Review } from '../types/review';

type AppState = {
  city: string;
  offers: Offer[];
  activeOfferId: string | null;
  sortType:
    | 'Popular'
    | 'Price: low to high'
    | 'Price: high to low'
    | 'Top rated first';
  currentOffer: OfferDescription | null;
  nearbyOffers: Offer[];
  comments: Review[];
  favoriteOffers: Offer[];
};

const initialState: AppState = {
  city: 'Paris',
  offers: [],
  activeOfferId: null,
  sortType: 'Popular',
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  favoriteOffers: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setActiveOfferId(state, action: PayloadAction<string | null>) {
      state.activeOfferId = action.payload;
    },
    setSortType(state, action: PayloadAction<AppState['sortType']>) {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.currentOffer = null;
      })
      .addCase(
        fetchOfferById.fulfilled,
        (state, action: PayloadAction<OfferDescription>) => {
          state.currentOffer = action.payload;
        }
      )
      .addCase(fetchOfferById.rejected, (state) => {
        state.currentOffer = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOfferCommentsById.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchOfferCommentsById.rejected, (state) => {
        state.comments = [];
      })
      .addCase(postOfferComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(
        fetchFavoriteOffers.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.favoriteOffers = action.payload;
        }
      )
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      });
  },
});

export const { setCity, setOffers, setActiveOfferId, setSortType } =
  appSlice.actions;
export default appSlice.reducer;
