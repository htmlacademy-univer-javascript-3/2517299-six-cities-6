import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../store';
import offerReducer from '../store/offer/offer.slice';
import offersReducer from '../store/offers/offers.slice';
import authReducer from '../store/auth/auth.slice';

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      offer: offerReducer,
      offers: offersReducer,
      auth: authReducer,
    },
    preloadedState,
  });
