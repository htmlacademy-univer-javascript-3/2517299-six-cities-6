export type Location = {
    latitude: number;
    longitude: number;
};

type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium?: boolean;
  isFavorite?: boolean;
  previewImage: string;
  city: City;
};
