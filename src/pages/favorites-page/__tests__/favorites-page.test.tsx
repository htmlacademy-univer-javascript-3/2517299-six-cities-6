import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createTestStore } from '../../../utils/create-test-store';
import { makeOffer } from '../../../utils/mocks';
import { RootState } from '../../../store';
import FavoritesPage from '..';
import { CityNames, SortingType } from '../../../types/offers';
import { AuthorizationStatus } from '../../../types/auth';

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
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'test@test.com',
          name: 'Test',
          avatarUrl: '',
          isPro: false,
          token: 'six-cities',
        },
      },
      offers: {
        city: CityNames.Paris,
        offers: [],
        sortType: SortingType.Popular,
        activeOfferId: null,
        favoriteOffers: [makeOffer('1', CityNames.Paris), makeOffer('2', CityNames.Amsterdam)],
      },
    });

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
  });

  it('renders empty favorites list', () => {
    renderWithStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      offers: {
        city: CityNames.Paris,
        offers: [],
        sortType: SortingType.Popular,
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('No saved offers yet')).toBeInTheDocument();
  });
});
