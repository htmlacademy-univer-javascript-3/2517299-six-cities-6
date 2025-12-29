import { render, screen, fireEvent } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import PlaceCard from '..';
import { makeOffer } from '../../../utils/mocks';
import { createTestStore } from '../../../utils/create-test-store';
import * as useFavoriteModule from '../../../hooks/use-favorite';

type NavigateFunction = (
  to: string,
  options?: { replace?: boolean; state?: unknown }
) => void;

vi.mock('react-router-dom', async () => {
  const actual: typeof ReactRouterDom = await vi.importActual(
    'react-router-dom'
  );

  return {
    ...actual,
    useNavigate: () => vi.fn() as NavigateFunction,
  };
});

describe('PlaceCard component', () => {
  const offer = makeOffer('1', 'Paris');

  const renderWithProvider = (
    isAuthorized?: boolean,
    onHover?: (id: string | null) => void
  ) => {
    const store = createTestStore();
    return render(
      <Provider store={store}>
        <ReactRouterDom.MemoryRouter>
          <PlaceCard
            offer={offer}
            isAuthorized={isAuthorized}
            onHover={onHover}
          />
        </ReactRouterDom.MemoryRouter>
      </Provider>
    );
  };

  it('calls toggleFavorite when bookmark clicked and authorized', () => {
    const toggleFavoriteMock: (id: string, isFavorite: boolean | undefined) => void =
      vi.fn();
    vi.spyOn(useFavoriteModule, 'useFavorite').mockReturnValue({
      toggleFavorite: toggleFavoriteMock,
    });

    renderWithProvider(true);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavoriteMock).toHaveBeenCalledWith(offer.id, offer.isFavorite);
  });

  it('triggers onHover callbacks', () => {
    const onHoverMock: (id: string | null) => void = vi.fn();

    renderWithProvider(false, onHoverMock);

    const card = screen.getByTestId('place-card');
    fireEvent.mouseEnter(card);
    expect(onHoverMock).toHaveBeenCalledWith(offer.id);

    fireEvent.mouseLeave(card);
    expect(onHoverMock).toHaveBeenCalledWith(null);
  });
});
