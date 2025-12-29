import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from '..';

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true,
    });
    localStorage.clear();
  });

  it('renders Sign in when user is not authorized', () => {
    render(
      <MemoryRouter>
        <Header isAuthorized={false} favoriteCount={0} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('renders user info and Sign out when authorized', () => {
    const user = { email: 'test@example.com', avatarUrl: 'avatar.jpg' };

    render(
      <MemoryRouter>
        <Header isAuthorized user={user} favoriteCount={5} />
      </MemoryRouter>
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('handles Sign out click', () => {
    const user = { email: 'test@example.com', avatarUrl: 'avatar.jpg' };
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <MemoryRouter>
        <Header isAuthorized user={user} favoriteCount={1} />
      </MemoryRouter>
    );

    const button = screen.getByText(/Sign out/i);
    fireEvent.click(button);

    expect(localStorage.getItem('six-cities-token')).toBeNull();
    expect(reloadMock).toHaveBeenCalled();
  });
});
