import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createTestStore } from '../../../utils/create-test-store';
import OfferPage from '..';
import { makeOffer, makeOfferDescription } from '../../../utils/mocks';
import { RootState } from '../../../store';

const renderWithStoreAndRoute = (
  preloadedState: Partial<RootState>,
  route = '/offer/1'
) => {
  const store = createTestStore(preloadedState);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/404" element={<div>404 Not Found</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('OfferPage', () => {
  const currentOfferMock = makeOfferDescription('1', 'Paris');
  const nearbyOffersMock = [
    makeOffer('2', 'Paris'),
    makeOffer('3', 'Paris'),
    makeOffer('4', 'Paris'),
  ];
  const favoriteOffersMock = [makeOffer('5', 'Paris'), makeOffer('6', 'Paris')];
  const commentsMock = [
    {
      id: '1',
      user: { name: 'Alice', avatarUrl: '', isPro: false },
      rating: 4,
      comment: 'Nice',
      date: '2025-01-01',
    },
    {
      id: '2',
      user: { name: 'Bob', avatarUrl: '', isPro: true },
      rating: 5,
      comment: 'Excellent',
      date: '2025-01-02',
    },
  ];

  it('renders offer details correctly', () => {
    renderWithStoreAndRoute({
      auth: {
        authorizationStatus: 'AUTH',
        user: {
          name: 'Test',
          email: 'test@test.com',
          avatarUrl: '',
          isPro: true,
          token: 'token',
        },
      },
      offer: {
        currentOffer: currentOfferMock,
        nearbyOffers: nearbyOffersMock,
        comments: commentsMock,
        isNotFound: false,
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: favoriteOffersMock,
      },
    });

    expect(screen.getByText(currentOfferMock.title)).toBeInTheDocument();
    expect(screen.getByText(`€${currentOfferMock.price}`)).toBeInTheDocument();
    expect(screen.getAllByText(currentOfferMock.type)[0]).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });

  it('renders ReviewForm only if authorized', () => {
    renderWithStoreAndRoute({
      auth: {
        authorizationStatus: 'AUTH',
        user: {
          name: 'Test',
          email: 'test@test.com',
          avatarUrl: '',
          isPro: true,
          token: 'token',
        },
      },
      offer: {
        currentOffer: currentOfferMock,
        nearbyOffers: nearbyOffersMock,
        comments: commentsMock,
        isNotFound: false,
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: favoriteOffersMock,
      },
    });

    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('redirects to 404 page if offer not found', () => {
    renderWithStoreAndRoute({
      auth: { authorizationStatus: 'AUTH', user: null },
      offer: {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isNotFound: true,
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('bookmark button navigates to login if not authorized', () => {
    renderWithStoreAndRoute({
      auth: { authorizationStatus: 'NO_AUTH', user: null },
      offer: {
        currentOffer: currentOfferMock,
        nearbyOffers: nearbyOffersMock,
        comments: commentsMock,
        isNotFound: false,
      },
      offers: {
        city: 'Paris',
        offers: [],
        sortType: 'Popular',
        activeOfferId: null,
        favoriteOffers: [],
      },
    });

    const offerCard = screen
      .getByText(currentOfferMock.title)
      .closest('.offer__name-wrapper');

    if (!offerCard) {
      throw new Error('Offer card not found');
    }

    const bookmarkButton = within(offerCard as HTMLElement).getByRole(
      'button',
      {
        name: /to bookmarks/i,
      }
    );
    fireEvent.click(bookmarkButton);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
