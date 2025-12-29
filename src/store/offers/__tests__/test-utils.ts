import { Offer } from '../../../types/offers';

export const makeOffer = (
  overrides: Partial<Offer> = {}
): Offer => ({
  id: '1',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: '',
  ...overrides,
});
