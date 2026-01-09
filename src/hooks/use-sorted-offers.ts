import { useMemo } from 'react';
import { Offer, SortingType } from '../types/offers';

export const useSortedOffers = (offers: Offer[], sortType: SortingType): Offer[] =>
  useMemo(() => {
    const sorted = [...offers];

    switch (sortType) {
      case SortingType.PriceLowToHigh:
        sorted.sort((a, b) => a.price - b.price);
        break;
      case SortingType.PriceHighToLow:
        sorted.sort((a, b) => b.price - a.price);
        break;
      case SortingType.TopRatedFirst:
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [offers, sortType]);
