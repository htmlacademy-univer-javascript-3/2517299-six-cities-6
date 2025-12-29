import { OfferDescription } from '../../../types/offers';

export const makeOfferDescription = (
  overrides: Partial<OfferDescription> = {}
): OfferDescription => ({
  id: '1',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 13,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  bedrooms: 2,
  maxAdults: 4,
  goods: [],
  host: {
    name: 'Host',
    avatarUrl: '',
    isPro: false,
  },
  description: 'Nice place',
  images: [],
  ...overrides,
});
