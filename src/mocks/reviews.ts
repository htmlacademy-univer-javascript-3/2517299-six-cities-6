import { Review } from '../types/review';

export const mockReviews: Review[] = [
  {
    id: '1',
    comment: 'A quiet cozy and picturesque that hides behind a river.',
    date: '2019-04-24',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
  },
];
