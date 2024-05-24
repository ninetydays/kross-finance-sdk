import { AxiosRequestConfig, AxiosResponse } from 'axios';
export * from './investments';
export * from './loans';
export * from './user';
export * from './investments';
type RefreshTokenCallback = (token: string) => void;
type forceLogoutCallback = () => void;

export type KrossClientOptions = AxiosRequestConfig & {
  baseURL: string;
  accessId: string;
  secretKey: string;
  authToken?: string;
  refreshToken?: string;
  refreshTokenCallback?: RefreshTokenCallback;
  forceLogoutCallback?: forceLogoutCallback;
};

export type FunctionOptions = {
  url: string;
  urlParam?: string;
  method: string;
};

export type FunctionResponse<T = unknown> = {
  data?: T;
  okay: boolean;
  message?: string;
  success?: boolean;
};

export type FunctionRegistered<O = unknown, I = unknown> = (
  input?: I
) => Promise<AxiosResponse<O>>;

export type LoginDto = {
  keyid: string;
  password: string;
  refreshExpiresIn?: number;
};

export type LoginResponse = {
  token: string;
  refresh: string;
};

export type GetAuthTokenResponse = {
  token: string;
};

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}
