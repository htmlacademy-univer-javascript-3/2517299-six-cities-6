import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { api, TOKEN_KEY } from '../../../services/api';
import { login, checkAuth } from '../auth.thunks';
import { AuthInfo, LoginData, LoginResponse } from '../../../types/auth';

describe('Auth thunks with axios-mock-adapter', () => {
  let mockAPI: MockAdapter;

  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    mockAPI = new MockAdapter(api);
    vi.resetAllMocks();
  });

  it('login success', async () => {
    const loginData: LoginData = { email: 'test@test.com', password: '1234' };
    const loginResponse: LoginResponse = { token: 'token123' };

    mockAPI.onPost('/login', loginData).reply(200, loginResponse);
    const localStorageSetSpy = vi.spyOn(Storage.prototype, 'setItem');

    const action = await login(loginData)(dispatch, getState, undefined);

    expect(localStorageSetSpy).toHaveBeenCalledWith(TOKEN_KEY, 'token123');
    expect(action.payload).toBeUndefined();
  });

  it('login failure 401', async () => {
    const loginData: LoginData = { email: 'fail@test.com', password: 'wrong' };
    mockAPI.onPost('/login').reply(401);

    const action = await login(loginData)(dispatch, getState, undefined);

    expect(action.payload).toBe('Invalid credentials');
  });

  it('checkAuth returns null if no token', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

    const action = await checkAuth()(dispatch, getState, undefined);

    expect(action.payload).toBeNull();
  });

  it('checkAuth with token', async () => {
    const token = 'token123';
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(token);
    const mockAuthInfo: AuthInfo = { name: 'User', avatarUrl: '', email: 'test@mail.ru', isPro: false, token: 'six-cities' };

    mockAPI.onGet('/login').reply(200, mockAuthInfo);

    const action = await checkAuth()(dispatch, getState, undefined);

    expect(api.defaults.headers.common['X-Token']).toBe(token);
    expect(action.payload).toEqual(mockAuthInfo);
  });
});
