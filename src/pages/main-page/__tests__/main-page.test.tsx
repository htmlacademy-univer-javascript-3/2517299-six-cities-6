import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '..';
import { createTestStore } from '../../../utils/create-test-store';
import { makeOffer } from '../../../utils/mocks';
import { RootState } from '../../../store';

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
      makeOffer('1', 'Paris'),
      makeOffer('2', 'Paris')
    ];

    renderWithStore({
      auth: { authorizationStatus: 'AUTH', user: null },
      offers: {
        city: 'Paris',
        offers,
        sortType: 'Popular',
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
      auth: { authorizationStatus: 'NO_AUTH', user: null },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });

  it('displays the correct number of offers for another city', () => {
    const offers = [
      makeOffer('1', 'Amsterdam')
    ];

    renderWithStore({
      auth: { authorizationStatus: 'AUTH', user: null },
      offers: {
        city: 'Amsterdam',
        offers,
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('1 places to stay in Amsterdam')).toBeInTheDocument();
  });
});
