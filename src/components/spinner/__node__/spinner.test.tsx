import { render, screen } from '@testing-library/react';
import Spinner from '..';

describe('Spinner', () => {
  it('renders spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
