import { Offer } from '../../../types/offers';
import offerReducer from '../offer.slice';
import {
  fetchOfferById,
  fetchNearbyOffers,
  fetchOfferComments,
  postOfferComment,
  toggleFavoriteStatus,
} from '../offer.thunks';
import { makeOfferDescription } from './test-utils';

describe('offerSlice reducer', () => {
  const initialState = {
    currentOffer: null,
    nearbyOffers: [],
    comments: [],
    isNotFound: false,
  };

  test('fetchOfferById.fulfilled', () => {
    const offer = { id: '1', isFavorite: false };

    const state = offerReducer(initialState, {
      type: fetchOfferById.fulfilled.type,
      payload: offer,
    });

    expect(state.currentOffer).toEqual(offer);
    expect(state.isNotFound).toBe(false);
  });

  test('fetchOfferById.rejected → isNotFound = true', () => {
    const state = offerReducer(initialState, {
      type: fetchOfferById.rejected.type,
    });

    expect(state.isNotFound).toBe(true);
  });

  test('fetchNearbyOffers.fulfilled', () => {
    const offers = [{ id: '1' }, { id: '2' }];

    const state = offerReducer(initialState, {
      type: fetchNearbyOffers.fulfilled.type,
      payload: offers,
    });

    expect(state.nearbyOffers).toEqual(offers);
  });

  test('fetchOfferComments.fulfilled', () => {
    const comments = [{ id: '1', comment: 'Nice' }];

    const state = offerReducer(initialState, {
      type: fetchOfferComments.fulfilled.type,
      payload: comments,
    });

    expect(state.comments).toEqual(comments);
  });

  test('postOfferComment.fulfilled', () => {
    const comments = [{ id: '1', comment: 'Updated' }];

    const state = offerReducer(initialState, {
      type: postOfferComment.fulfilled.type,
      payload: comments,
    });

    expect(state.comments).toEqual(comments);
  });

  test('toggleFavoriteStatus.fulfilled updates currentOffer', () => {
    const prevState = {
      ...initialState,
      currentOffer: makeOfferDescription({ isFavorite: false }),
    };

    const updatedOffer = {
      id: '1',
      isFavorite: true,
    } as Offer;

    const state = offerReducer(prevState, {
      type: toggleFavoriteStatus.fulfilled.type,
      payload: updatedOffer,
    });

    expect(state.currentOffer?.isFavorite).toBe(true);
  });
});
