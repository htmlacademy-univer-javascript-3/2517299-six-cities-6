import { OffersState } from '../store/offers/offers.slice';
import { Offer, OfferDescription } from '../types/offers';

export const createOffersState = (
  overrides?: Partial<OffersState>
): OffersState => ({
  city: 'Paris',
  offers: [],
  sortType: 'Popular',
  activeOfferId: null,
  favoriteOffers: [],
  ...overrides,
});

export const makeOffer = (id: string, cityName: string): Offer =>
  ({
    id,
    title: `Offer ${id}`,
    city: { name: cityName },
    price: 100,
    rating: 4.5,
    isFavorite: true,
  } as Offer);

export const makeOfferDescription = (
  id: string,
  cityName: string
): OfferDescription =>
  ({
    id,
    title: 'Waterfront with extraordinary view',
    description:
      'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
    type: 'room',
    price: 252,
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/15.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    ],
    city: {
      name: cityName,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    goods: [
      'Cable TV',
      'Breakfast',
      'Washer',
      'Kitchen',
      'Dishwasher',
      'Towels',
      'Wi-Fi',
      'Washing machine',
      'Air conditioning',
      'Heating',
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl:
        'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    },
    isPremium: false,
    isFavorite: false,
    rating: 1.9,
    bedrooms: 1,
    maxAdults: 3,
  } as OfferDescription);
