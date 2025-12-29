import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTestStore } from './utils/create-test-store';
import { AuthorizationStatus } from './types/auth';
import PrivateRoute from './private-route';
describe('PrivateRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;

  const renderWithStore = (authStatus: AuthorizationStatus) => {
    const store = createTestStore({
      auth: {
        authorizationStatus: authStatus,
        user:
          authStatus === 'AUTH'
            ? {name: 'Test User',avatarUrl: '', email: 'test@mail.ru',isPro: false,token: 'six-cities',}
            : null,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('renders children when user is authorized', () => {
    renderWithStore('AUTH');

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to login when user is not authorized', () => {
    renderWithStore('NO_AUTH');

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
