import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TOKEN_KEY = 'six-cities-token';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);
