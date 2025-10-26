type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  city: City;
};
