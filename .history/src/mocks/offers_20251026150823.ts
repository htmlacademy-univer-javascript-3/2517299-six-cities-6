import { v4 as uuidv4 } from 'uuid';

import { Offer } from '../types/offers';

const createUUID = (): string => String(uuidv4());

export const offers: Offer[] = [
  {
    id: createUUID(),
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    rating: 4.8,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
      },
    },
  },
  {
    id: createUUID(),
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4.0,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 52.371216,
        longitude: 4.894168,
      },
    },
  },
  {
    id: createUUID(),
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.2,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.372216,
        longitude: 4.893168,
      },
    },
  },
  {
    id: createUUID(),
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5.0,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-03.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.373216,
        longitude: 4.892168,
      },
    },
  },
];
