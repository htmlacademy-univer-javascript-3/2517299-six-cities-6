import { render, screen } from '@testing-library/react';
import { CityNames, Offer, SortingType } from '../../../types/offers';
import { createTestStore } from '../../../utils/create-test-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MemoFavoritesList from '..';
import { makeOffer } from '../../../utils/mocks';

const renderWithProvider = (offers: Offer[], isAuthorized = true) => {
  const store = createTestStore({
    offers: {
      city: CityNames.Paris,
      offers,
      sortType: SortingType.Popular,
      activeOfferId: null,
      favoriteOffers: [],
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MemoFavoritesList offers={offers} isAuthorized={isAuthorized}/>
      </MemoryRouter>
    </Provider>
  );
};

describe('FavoritesList', () => {
  it('renders cities and offers', () => {
    const offers = [
      makeOffer('1', CityNames.Paris),
      makeOffer('2', CityNames.Paris),
      makeOffer('3', CityNames.Amsterdam),
    ];

    renderWithProvider(offers);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Offer 3')).toBeInTheDocument();
  });

  it('groups offers by city', () => {
    const offers = [
      makeOffer('1', CityNames.Paris),
      makeOffer('2', CityNames.Amsterdam),
      makeOffer('3', CityNames.Paris),
    ];

    renderWithProvider(offers);

    const parisSection = screen.getByText('Paris').closest('li');
    expect(parisSection?.querySelectorAll('.place-card')).toHaveLength(2);

    const amsterdamSection = screen.getByText('Amsterdam').closest('li');
    expect(amsterdamSection?.querySelectorAll('.place-card')).toHaveLength(1);
  });
});
