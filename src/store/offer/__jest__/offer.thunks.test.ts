import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../../services/api';
import {
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferComments,
  postOfferComment,
  toggleFavoriteStatus,
} from '../offer.thunks';
import { NewCommentData, Review } from '../../../types/review';
import { makeOfferDescription } from './test-utils';
import { makeOffer } from '../../offers/__jest__/test-utils';

describe('Offer thunks with axios-mock-adapter', () => {
  let mockAPI: MockAdapter;

  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    mockAPI = new MockAdapter(api);
    vi.resetAllMocks();
  });

  it('fetchOfferById success', async () => {
    const mockOffer = makeOfferDescription({ id: '1' });
    mockAPI.onGet('/offers/1').reply(200, mockOffer);

    const action = await fetchOfferById('1')(dispatch, getState, undefined);
    const result = action.payload;

    expect(result).toEqual(mockOffer);
  });

  it('fetchNearbyOffers success', async () => {
    const mockOffers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    mockAPI.onGet('/offers/1/nearby').reply(200, mockOffers);

    const action = await fetchNearbyOffers('1')(dispatch, getState, undefined);
    const result = action.payload;

    expect(result).toEqual(mockOffers);
  });

  it('fetchOfferComments success', async () => {
    const mockComments: Review[] = [
      { id: '1', comment: 'Great', rating: 5, user: { name: 'User1', avatarUrl: '', isPro: false }, date: '2025-12-28T00:00:00.000Z' },
    ];
    mockAPI.onGet('/comments/1').reply(200, mockComments);

    const action = await fetchOfferComments('1')(dispatch, getState, undefined);
    const result = action.payload;

    expect(result).toEqual(mockComments);
  });

  it('postOfferComment success', async () => {
    const newComment: NewCommentData = { comment: 'Test', rating: 5 };
    const mockResponse: Review[] = [
      { id: '1', comment: 'Test', rating: 5, user: { name: 'User1', avatarUrl: '', isPro: false }, date: '2025-12-28T00:00:00.000Z' },
    ];
    mockAPI.onPost('/comments/1', newComment).reply(200, mockResponse);

    const action = await postOfferComment({ offerId: '1', data: newComment })(
      dispatch,
      getState,
      undefined
    );
    const result = action.payload;

    expect(result).toEqual(mockResponse);
  });

  it('toggleFavoriteStatus success', async () => {
    const mockOffer = makeOffer({ id: '1', isFavorite: true });
    mockAPI.onPost('/favorite/1/1').reply(200, mockOffer);

    const action = await toggleFavoriteStatus({ offerId: '1', status: 1 })(
      dispatch,
      getState,
      undefined
    );
    const result = action.payload;

    expect(result).toEqual(mockOffer);
  });
});
