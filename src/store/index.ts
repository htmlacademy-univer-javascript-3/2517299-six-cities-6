import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import offersReducer from './offers/offers.slice';
import offerReducer from './offer/offer.slice';
import authReducer from './auth/auth.slice';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    offer: offerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
