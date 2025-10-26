export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  city: string;
};

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4.0,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    city: 'Amsterdam',
  },
  {
    id: 2,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.0,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg',
    city: 'Amsterdam',
  },
  {
    id: 3,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5.0,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-03.jpg',
    city: 'Brussels',
  },
  {
    id: 4,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    rating: 4.8,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    city: 'Cologne',
  },
];
