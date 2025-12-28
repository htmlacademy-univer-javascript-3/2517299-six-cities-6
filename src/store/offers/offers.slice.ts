import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { fetchFavoriteOffers, fetchOffers } from './offers.thunks';
import { toggleFavoriteStatus } from '../offer/offer.thunks';

export type SortingType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

export type OffersState = {
  city: string;
  offers: Offer[];
  sortType: SortingType;
  activeOfferId: string | null;
  favoriteOffers: Offer[];
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  activeOfferId: null,
  favoriteOffers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortingType>) => {
      state.sortType = action.payload;
    },
    setActiveOfferId: (state, action: PayloadAction<string | null>) => {
      state.activeOfferId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(
        fetchFavoriteOffers.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.favoriteOffers = action.payload;
        }
      )
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const index = state.offers.findIndex((o) => o.id === updatedOffer.id);
        if (index !== -1) {
          state.offers[index] = updatedOffer;
        }

        if (updatedOffer.isFavorite) {
          if (!state.favoriteOffers.find((o) => o.id === updatedOffer.id)) {
            state.favoriteOffers.push(updatedOffer);
          }
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (o) => o.id !== updatedOffer.id
          );
        }
      });
  },
});

export const { setCity, setSortType, setActiveOfferId } = offersSlice.actions;

export default offersSlice.reducer;
