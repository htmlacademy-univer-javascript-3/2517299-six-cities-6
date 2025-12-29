import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useLoginForm } from '../use-login-form';
import { createTestStore } from '../../utils/create-test-store';

describe('useLoginForm', () => {
  it('should handle submission success and error', async () => {
    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );

    const formData = { email: 'test@test.com', password: 'password' };
    const { result } = renderHook(() => useLoginForm(formData), { wrapper });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errorMessage).toBe('');

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSubmitting).toBe(false);

    expect(result.current.errorMessage).toBe(
      'Login failed. Check your email and password.'
    );
  });
});
