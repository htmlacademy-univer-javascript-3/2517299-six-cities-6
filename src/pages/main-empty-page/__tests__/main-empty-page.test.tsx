import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MainEmpty from '..';
import { createTestStore } from '../../../utils/create-test-store';
import { RootState } from '../../../store';

const renderWithStore = (city: string, preloadedState?: Partial<RootState>) => {
  const store = createTestStore(preloadedState);

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MainEmpty city={city} />
      </MemoryRouter>
    </Provider>
  );
};

describe('Component: MainEmpty', () => {
  it('renders the component with the correct city', () => {
    const city = 'Paris';
    renderWithStore(city);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${city}`)
    ).toBeInTheDocument();

    expect(document.querySelector('.cities__places-container--empty')).toBeInTheDocument();

    expect(document.querySelector('.locations__list')).toBeInTheDocument();
  });

  it('renders empty container structure for another city', () => {
    renderWithStore('Amsterdam');

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available/i)).toBeInTheDocument();
    expect(document.querySelector('.cities__places-container--empty')).toBeInTheDocument();
  });
});
