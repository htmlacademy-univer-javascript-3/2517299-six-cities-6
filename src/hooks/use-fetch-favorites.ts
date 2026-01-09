import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchFavoriteOffers } from '../store/offers/offers.thunks';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../types/auth';

export const useFetchFavoritesIfAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.authorizationStatus === AuthorizationStatus.Auth
  );

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, isAuthorized]);
};
