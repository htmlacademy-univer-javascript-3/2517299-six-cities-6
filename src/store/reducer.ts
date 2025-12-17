import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';

type AppState = {
  city: string;
  offers: Offer[];
  activeOfferId: string | null;
  sortType: 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
};

const initialState: AppState = {
  city: 'Paris',
  offers: [],
  activeOfferId: null,
  sortType: 'Popular',
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
});

export const { setCity, setOffers, setActiveOfferId, setSortType } = appSlice.actions;
export default appSlice.reducer;
