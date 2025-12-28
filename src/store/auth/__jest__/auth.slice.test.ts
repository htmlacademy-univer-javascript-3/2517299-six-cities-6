import authReducer from '../auth.slice';
import { login, checkAuth } from '../auth.thunks';
import { AuthorizationStatus } from '../../../types/auth';

describe('authSlice reducer', () => {
  const initialState = {
    authorizationStatus: 'NO_AUTH' as AuthorizationStatus,
    user: null,
  };

  test('should return initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('login.fulfilled → AUTH', () => {
    const state = authReducer(initialState, {
      type: login.fulfilled.type,
    });

    expect(state.authorizationStatus).toBe('AUTH');
  });

  test('login.rejected → NO_AUTH', () => {
    const state = authReducer(initialState, {
      type: login.rejected.type,
    });

    expect(state.authorizationStatus).toBe('NO_AUTH');
  });

  test('checkAuth.fulfilled with user → AUTH', () => {
    const user = {
      email: 'test@test.com',
      name: 'Test',
      avatarUrl: '',
      isPro: false,
    };

    const state = authReducer(initialState, {
      type: checkAuth.fulfilled.type,
      payload: user,
    });

    expect(state.authorizationStatus).toBe('AUTH');
    expect(state.user).toEqual(user);
  });

  test('checkAuth.fulfilled with null → NO_AUTH', () => {
    const state = authReducer(initialState, {
      type: checkAuth.fulfilled.type,
      payload: null,
    });

    expect(state.authorizationStatus).toBe('NO_AUTH');
    expect(state.user).toBeNull();
  });
});
