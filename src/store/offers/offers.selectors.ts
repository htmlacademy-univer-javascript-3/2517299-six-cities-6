import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { CityNames, Offer, SortingType } from '../../types/offers';

export const selectOffers = (state: RootState): Offer[] => state.offers.offers;

export const selectCity = (state: RootState): CityNames => state.offers.city;

export const selectSortType = (state: RootState): SortingType =>
  state.offers.sortType;

export const selectSortedOffers = createSelector(
  [selectOffers, selectCity, selectSortType],
  (offers, city, sortType): Offer[] => {
    const filtered = offers.filter((o) => o.city.name === city);

    switch (sortType) {
      case SortingType.PriceLowToHigh:
        return [...filtered].sort((a, b) => a.price - b.price);
      case SortingType.PriceHighToLow:
        return [...filtered].sort((a, b) => b.price - a.price);
      case SortingType.TopRatedFirst:
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }
);
