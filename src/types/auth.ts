export type AuthorizationStatus = 'AUTH' | 'NO_AUTH';

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type AuthInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};
