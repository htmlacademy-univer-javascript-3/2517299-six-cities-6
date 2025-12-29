import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import OffersList from '..';
import { makeOffer } from '../../../utils/mocks';
import { createTestStore } from '../../../utils/create-test-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Offer } from '../../../types/offers';

const renderWithProvider = (
  offers: Offer[],
  isAuthorized?: boolean,
  onHover?: (id: string | null) => void
) => {
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
        <OffersList
          offers={offers}
          isAuthorized={isAuthorized}
          onHover={onHover}
        />
      </MemoryRouter>
    </Provider>
  );
};

describe('OffersList component', () => {
  const offers = [makeOffer('1', 'Paris'), makeOffer('2', 'Paris')];

  it('renders all offers', () => {
    renderWithProvider(offers);

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('renders with isAuthorized prop', () => {
    renderWithProvider(offers, true);

    const offerElements = screen.getAllByText(/Offer/i);
    expect(offerElements.length).toBe(2);
  });

  it('calls onHover when passed', () => {
    const onHoverMock = vi.fn();
    renderWithProvider(offers, true, onHoverMock);

    const offerElement = screen.getByText('Offer 1');
    fireEvent.mouseOver(offerElement);

    expect(onHoverMock).toHaveBeenCalledTimes(1);
    expect(onHoverMock).toHaveBeenCalledWith('1');
  });
});
