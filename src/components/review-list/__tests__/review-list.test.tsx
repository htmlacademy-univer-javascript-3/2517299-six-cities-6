import { render, screen } from '@testing-library/react';
import { Review } from '../../../types/review';
import ReviewsList from '..';

const mockReviews: Review[] = [
  { id: '1', comment: 'Nice', rating: 5, date: '2025-12-28T00:00:00.000Z', user: { name: 'User1', avatarUrl: '', isPro: false } },
  { id: '2', comment: 'Good', rating: 4, date: '2025-12-28T00:00:00.000Z', user: { name: 'User2', avatarUrl: '', isPro: false } },
];

describe('ReviewsList', () => {
  it('renders list of reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(/Nice/)).toBeInTheDocument();
    expect(screen.getByText(/Good/)).toBeInTheDocument();
  });
});
