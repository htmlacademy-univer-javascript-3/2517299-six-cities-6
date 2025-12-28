import offersReducer, {
  setCity,
  setSortType,
  setActiveOfferId,
  OffersState,
} from '../offers.slice';
import { fetchOffers } from '../offers.thunks';
import { toggleFavoriteStatus } from '../../offer/offer.thunks';
import { makeOffer } from './test-utils';

describe('offersSlice reducer', () => {
  const initialState: OffersState = {
    city: 'Paris',
    offers: [],
    sortType: 'Popular',
    activeOfferId: null,
    favoriteOffers: [],
  };
  test('setCity', () => {
    const state = offersReducer(initialState, setCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });

  test('setSortType', () => {
    const state = offersReducer(
      initialState,
      setSortType('Price: high to low')
    );
    expect(state.sortType).toBe('Price: high to low');
  });

  test('setActiveOfferId', () => {
    const state = offersReducer(initialState, setActiveOfferId('123'));
    expect(state.activeOfferId).toBe('123');
  });

  test('fetchOffers.fulfilled', () => {
    const offers = [{ id: '1' }, { id: '2' }];

    const state = offersReducer(initialState, {
      type: fetchOffers.fulfilled.type,
      payload: offers,
    });

    expect(state.offers).toEqual(offers);
  });

  test('fetchOffers.fulfilled', () => {
    const offers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];

    const state = offersReducer(initialState, {
      type: fetchOffers.fulfilled.type,
      payload: offers,
    });

    expect(state.offers).toEqual(offers);
  });

  test('toggleFavoriteStatus adds to favorites', () => {
    const prevState: OffersState = {
      ...initialState,
      offers: [makeOffer({ id: '1', isFavorite: false })],
    };

    const updatedOffer = makeOffer({ id: '1', isFavorite: true });

    const state = offersReducer(prevState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: updatedOffer,
    });

    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('1');
  });

  test('toggleFavoriteStatus removes from favorites', () => {
    const prevState: OffersState = {
      ...initialState,
      favoriteOffers: [makeOffer({ id: '1', isFavorite: true })],
    };

    const updatedOffer = makeOffer({ id: '1', isFavorite: false });

    const state = offersReducer(prevState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: updatedOffer,
    });

    expect(state.favoriteOffers).toHaveLength(0);
  });
});
