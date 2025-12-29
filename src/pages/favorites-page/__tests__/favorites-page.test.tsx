import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createTestStore } from '../../../utils/create-test-store';
import { makeOffer } from '../../../utils/mocks';
import { RootState } from '../../../store';
import FavoritesPage from '..';

const renderWithStore = (preloadedState: Partial<RootState>) => {
  const store = createTestStore(preloadedState);

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('FavoritesPage', () => {
  it('renders favorites when user is authorized', () => {
    renderWithStore({
      auth: {
        authorizationStatus: 'AUTH',
        user: {
          email: 'test@test.com',
          name: 'Test',
          avatarUrl: '',
          isPro: false,
          token: 'six-cities',
        },
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [makeOffer('1', 'Paris'), makeOffer('2', 'Amsterdam')],
      },
    });

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
  });

  it('renders empty favorites list', () => {
    renderWithStore({
      auth: {
        authorizationStatus: 'AUTH',
        user: null,
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('No saved offers yet')).toBeInTheDocument();
  });
});
