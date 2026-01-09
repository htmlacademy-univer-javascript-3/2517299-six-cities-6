import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '..';
import { createTestStore } from '../../../utils/create-test-store';
import { makeOffer } from '../../../utils/mocks';
import { RootState } from '../../../store';
import { CityNames, SortingType } from '../../../types/offers';
import { AuthorizationStatus } from '../../../types/auth';

const renderWithStore = (preloadedState: Partial<RootState>) => {
  const store = createTestStore(preloadedState);

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('Component: MainPage', () => {
  it('renders MainPage with offers', () => {
    const offers = [
      makeOffer('1', CityNames.Paris),
      makeOffer('2', CityNames.Paris)
    ];

    renderWithStore({
      auth: { authorizationStatus: AuthorizationStatus.Auth, user: null },
      offers: {
        city: CityNames.Paris,
        offers,
        sortType: SortingType.Popular,
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();

    expect(document.querySelector('.locations__list')).toBeInTheDocument();
    expect(document.querySelector('.places__list')).toBeInTheDocument();
    expect(document.querySelector('.map')).toBeInTheDocument();
    expect(document.querySelector('.cities__places-container')).toBeInTheDocument();
    expect(document.querySelector('.cities__right-section')).toBeInTheDocument();
  });

  it('renders MainEmpty when no offers for the city', () => {
    renderWithStore({
      auth: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      offers: {
        city: CityNames.Paris,
        offers: [],
        sortType: SortingType.Popular,
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });

  it('displays the correct number of offers for another city', () => {
    const offers = [
      makeOffer('1', CityNames.Amsterdam)
    ];

    renderWithStore({
      auth: { authorizationStatus: AuthorizationStatus.Auth, user: null },
      offers: {
        city: CityNames.Amsterdam,
        offers,
        sortType: SortingType.Popular,
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('1 places to stay in Amsterdam')).toBeInTheDocument();
  });
});
