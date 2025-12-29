import { render, screen } from '@testing-library/react';
import { Review } from '../../../types/review';
import ReviewItem from '..';

const mockReview: Review = {
  id: '1',
  comment: 'Great place',
  rating: 4,
  date: '2025-12-28T00:00:00.000Z',
  user: { name: 'User1', avatarUrl: '', isPro: false },
};

describe('ReviewItem', () => {
  it('renders review content', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(/Great place/i)).toBeInTheDocument();
    expect(screen.getByText(/User1/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /reviews avatar/i })).toBeInTheDocument();
    expect(screen.getByText(/December 2025/i)).toBeInTheDocument();
  });
});
