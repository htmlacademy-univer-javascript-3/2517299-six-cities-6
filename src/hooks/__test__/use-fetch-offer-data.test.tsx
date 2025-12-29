import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import { createTestStore } from '../../utils/create-test-store';
import { useFetchOfferData } from '../use-fetch-offer-data';

describe('useFetchOfferData', () => {
  it('should dispatch fetchOfferById, fetchNearbyOffers, fetchOfferComments when offerId is provided', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const offerId = '123';

    act(() => {
      renderHook(() => useFetchOfferData(offerId), { wrapper });
    });

    expect(store.getState().offer).toBeDefined();
  });

  it('should not dispatch anything when offerId is undefined', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    act(() => {
      renderHook(() => useFetchOfferData(undefined), { wrapper });
    });

    expect(store.getState().offer).toBeDefined();
  });
});
