import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../../services/api';
import { fetchOffers, fetchFavoriteOffers } from '../offers.thunks';
import { makeOffer } from './test-utils';

describe('Offers thunks with axios-mock-adapter', () => {
  let mockAPI: MockAdapter;

  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    mockAPI = new MockAdapter(api);
    vi.resetAllMocks();
  });

  it('fetchOffers success', async () => {
    const mockOffers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    mockAPI.onGet('/offers').reply(200, mockOffers);

    const action = await fetchOffers()(dispatch, getState, undefined);
    const result = action.payload;

    expect(result).toEqual(mockOffers);
  });

  it('fetchFavoriteOffers success', async () => {
    const mockOffers = [makeOffer({ id: '1' })];
    mockAPI.onGet('/favorite').reply(200, mockOffers);

    const action = await fetchFavoriteOffers()(dispatch, getState, undefined);
    const result = action.payload;

    expect(result).toEqual(mockOffers);
  });

  it('fetchFavoriteOffers failure', async () => {
    mockAPI.onGet('/favorite').reply(500);

    const action = await fetchFavoriteOffers()(dispatch, getState, undefined);

    expect(action.payload).toBe('Failed to fetch favorite offers');
  });
});
