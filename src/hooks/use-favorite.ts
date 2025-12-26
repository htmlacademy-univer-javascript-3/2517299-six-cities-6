import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  toggleFavoriteStatus,
} from '../store/app-actions';

export const useFavorite = () => {
  const dispatch = useDispatch<AppDispatch>();

  const toggleFavorite = useCallback(
    (offerId: string, isFavorite?: boolean) => {
      const status: 0 | 1 = isFavorite ? 0 : 1;
      dispatch(toggleFavoriteStatus({ offerId, status }));
    },
    [dispatch]
  );

  return { toggleFavorite };
};
