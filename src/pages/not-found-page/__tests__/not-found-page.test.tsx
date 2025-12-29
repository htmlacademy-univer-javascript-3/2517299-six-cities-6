import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '..';

describe('Component: NotFoundPage', () => {
  it('renders the 404 page correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /вернуться на главную/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
