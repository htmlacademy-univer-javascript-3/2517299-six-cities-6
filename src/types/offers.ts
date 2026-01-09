export type Location = {
  latitude: number;
  longitude: number;
};

type City = {
  name: CityNames;
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
  location: Location;
};

export type OfferDescription = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: CityNames;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

export enum SortingType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}
