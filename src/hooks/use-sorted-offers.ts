import { useMemo } from 'react';
import { Offer } from '../types/offers';
import { SortingType } from '../components/sorting-options';

export const useSortedOffers = (offers: Offer[], sortType: SortingType): Offer[] =>
  useMemo(() => {
    const sorted = [...offers];

    switch (sortType) {
      case 'Price: low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: high to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Top rated first':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [offers, sortType]);
