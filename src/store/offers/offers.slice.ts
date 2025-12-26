import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { fetchFavoriteOffers, fetchOffers } from './offers.thunks';

export type SortingType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type OffersState = {
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
      );
  },
});

export const { setCity, setSortType, setActiveOfferId } = offersSlice.actions;

export default offersSlice.reducer;
