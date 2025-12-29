import { render, screen } from '@testing-library/react';
import { Offer } from '../../../types/offers';
import { createTestStore } from '../../../utils/create-test-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MemoFavoritesList from '..';
import { makeOffer } from '../../../utils/mocks';

const renderWithProvider = (offers: Offer[], isAuthorized = true) => {
  const store = createTestStore({
    offers: {
      city: 'Paris',
      offers,
      sortType: 'Popular',
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
      makeOffer('1', 'Paris'),
      makeOffer('2', 'Paris'),
      makeOffer('3', 'Amsterdam'),
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
      makeOffer('1', 'Paris'),
      makeOffer('2', 'Amsterdam'),
      makeOffer('3', 'Paris'),
    ];

    renderWithProvider(offers);

    const parisSection = screen.getByText('Paris').closest('li');
    expect(parisSection?.querySelectorAll('.place-card')).toHaveLength(2);

    const amsterdamSection = screen.getByText('Amsterdam').closest('li');
    expect(amsterdamSection?.querySelectorAll('.place-card')).toHaveLength(1);
  });
});
