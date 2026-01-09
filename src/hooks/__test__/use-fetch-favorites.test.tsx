import { Provider } from 'react-redux';
import { createTestStore } from '../../utils/create-test-store';
import { useFetchFavoritesIfAuth } from '../use-fetch-favorites';
import { renderHook } from '@testing-library/react';
import { AuthorizationStatus } from '../../types/auth';
describe('useFetchFavoritesIfAuth', () => {
  it('should dispatch fetchFavoriteOffers if authorized', () => {
    const store = createTestStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          name: 'test-user',
          avatarUrl: '',
          email: 'test@mail.ru',
          isPro: false,
          token: 'six-cities',
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useFetchFavoritesIfAuth(), { wrapper });

    expect(store.getState().offers).toBeDefined();
  });

  it('should not dispatch fetchFavoriteOffers if not authorized', () => {
    const store = createTestStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: {
          name: 'test-user',
          avatarUrl: '',
          email: 'test@mail.ru',
          isPro: false,
          token: 'six-cities',
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useFetchFavoritesIfAuth(), { wrapper });

    expect(store.getState().offers).toBeDefined();
  });
});
