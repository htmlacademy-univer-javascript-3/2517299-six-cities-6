import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createTestStore } from '../../../utils/create-test-store';
import LoginPage from '..';

const handleSubmitMock = vi.fn();

vi.mock('../../../hooks/use-login-form', () => ({
  useLoginForm: () => ({
    handleSubmit: handleSubmitMock,
    isSubmitting: false,
    errorMessage: null,
  }),
}));

const renderPage = (authStatus: 'AUTH' | 'NO_AUTH' = 'NO_AUTH') => {
  const store = createTestStore({
    auth: { authorizationStatus: authStatus, user: null },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  return store;
};

describe('LoginPage', () => {
  beforeEach(() => {
    handleSubmitMock.mockClear();
  });

  it('renders login form correctly', () => {
    renderPage();

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('updates email and password fields on change', () => {
    renderPage();

    const emailInput = screen.getByPlaceholderText<HTMLInputElement>('Email');
    const passwordInput =
      screen.getByPlaceholderText<HTMLInputElement>('Password');

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'test@test.com' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: '123456' },
    });

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('123456');
  });

  it('calls handleSubmit when form is submitted', () => {
    renderPage();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { name: 'email', value: 'test@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { name: 'password', value: '123456' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('redirects to main page if user is authorized', () => {
    const store = renderPage('AUTH');

    const state = store.getState();
    expect(state.auth.authorizationStatus).toBe('AUTH');
  });
});
