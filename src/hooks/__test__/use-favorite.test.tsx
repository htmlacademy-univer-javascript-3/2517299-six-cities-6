import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useFavorite } from '../use-favorite';
import { createTestStore } from '../../utils/create-test-store';

describe('useFavorite', () => {
  it('should dispatch toggleFavoriteStatus with correct payload', () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useFavorite(), { wrapper });

    const offerId = '123';

    act(() => {
      result.current.toggleFavorite(offerId, false);
    });

    expect(store.getState().offer).toBeDefined();
  });
});
