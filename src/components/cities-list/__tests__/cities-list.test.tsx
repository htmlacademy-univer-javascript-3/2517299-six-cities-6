import { fireEvent, render } from '@testing-library/react';
import { RootState } from '../../../store';
import { createTestStore } from '../../../utils/create-test-store';
import { Provider } from 'react-redux';
import CitiesList from '..';
import { createOffersState } from '../../../utils/mocks';

const renderWithStore = (preloadedState?: Partial<RootState>) => {
  const store = createTestStore(preloadedState);

  const utils = render(
    <Provider store={store}>
      <CitiesList />
    </Provider>
  );

  return { ...utils, store };
};

describe('CitiesList', () => {
  it('renders all cities', () => {
    const { getAllByRole, getByText } = renderWithStore();

    const cityElements = getAllByRole('link');
    expect(cityElements).toHaveLength(6);
    expect(getByText('Paris')).toBeInTheDocument();
  });

  it('sets active class for selected city', () => {
    const { getByText } = renderWithStore({
      offers: createOffersState({ city: 'Brussels' }),
    });

    const activeLink = getByText('Brussels').closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
  });

  it('dispatches setCity on click', () => {
    const { getByText, store } = renderWithStore();
    const cityLink = getByText('Amsterdam').closest('a')!;
    fireEvent.click(cityLink);

    expect(store.getState().offers.city).toBe('Amsterdam');
  });
});
