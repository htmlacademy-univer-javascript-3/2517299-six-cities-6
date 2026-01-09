import { renderHook } from '@testing-library/react';
import { Offer, SortingType } from '../../types/offers';
import { useSortedOffers } from '../use-sorted-offers';

describe('useSortedOffers', () => {
  const offers: Offer[] = [
    { id: '1', price: 200, rating: 4.5 } as Offer,
    { id: '2', price: 100, rating: 5 } as Offer,
    { id: '3', price: 300, rating: 3 } as Offer,
  ];

  it('should sort offers by price ascending', () => {
    const sorted = renderHook(() =>
      useSortedOffers(offers, SortingType.PriceLowToHigh)
    ).result.current;

    expect(sorted.map((o) => o.id)).toEqual(['2', '1', '3']);
  });

  it('should sort offers by price descending', () => {
    const sorted = renderHook(() =>
      useSortedOffers(offers, SortingType.PriceHighToLow)
    ).result.current;

    expect(sorted.map((o) => o.id)).toEqual(['3', '1', '2']);
  });

  it('should sort offers by rating descending', () => {
    const sorted = renderHook(() =>
      useSortedOffers(offers, SortingType.TopRatedFirst)
    ).result.current;

    expect(sorted.map((o) => o.id)).toEqual(['2', '1', '3']);
  });
});
