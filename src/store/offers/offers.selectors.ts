import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Offer } from '../../types/offers';
import { SortingType } from './offers.slice';

export const selectOffers = (state: RootState): Offer[] =>
  state.offers.offers;

export const selectCity = (state: RootState): string =>
  state.offers.city;

export const selectSortType = (state: RootState): SortingType =>
  state.offers.sortType;

export const selectSortedOffers = createSelector(
  [selectOffers, selectCity, selectSortType],
  (offers, city, sortType): Offer[] => {
    const filtered = offers.filter((o) => o.city.name === city);

    switch (sortType) {
      case 'Price: low to high':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }
);
