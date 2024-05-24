import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  KrossClientOptions,
  FunctionOptions,
  LoginDto,
  LoginResponse,
  GetAuthTokenResponse,
} from '../types';
import { hmacTokenFunction } from '../utils/encryptor';
import jwt_decode from 'jwt-decode';

export class KrossClientBase {
  instance: AxiosInstance;
  authToken?: string | null | undefined;
  refreshToken?: string | null | undefined;
  refreshTokenCallback?: ((token: string) => void) | null | undefined;
  forceLogoutCallback?: (() => void) | null | undefined;

  accessId: string;
  secretKey: string;

  constructor(options: KrossClientOptions) {
    this.instance = axios.create(options);
    this.authToken = options?.authToken || null;
    this.refreshToken = options?.refreshToken || null;
    this.refreshTokenCallback = options?.refreshTokenCallback || null;
    this.forceLogoutCallback = options?.forceLogoutCallback || null;
    this.accessId = options.accessId;
    this.secretKey = options.secretKey;

    this.instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const getHmacToken = await hmacTokenFunction(
          this.accessId as string,
          this.secretKey as string
        );

        const hmacToken = await getHmacToken();
        config.headers = {
          ...config.headers,
          'client-authorization': hmacToken.hmacToken,
          'X-Date': hmacToken.xDate,
          'Cache-Control': 'no-cache',
        };

        if (this.refreshToken || this.authToken) {
          if (this.authToken) {
            const user: any = await jwt_decode(this.authToken as string);
            const isAuthTokenExpired = user.exp * 1000 < Date.now();

            if (!isAuthTokenExpired) {
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${this.authToken}`,
              };

              return config;
            }
          }

          const userRefreshToken: any = await jwt_decode(
            this.refreshToken as string
          );
          const isRefreshTokenExpired =
            userRefreshToken.exp * 1000 < Date.now();

          if (isRefreshTokenExpired) {
            this.authToken = null;
            this.refreshToken = null;
            if (this?.forceLogoutCallback) await this.forceLogoutCallback();
            return config;
          }

          try {
            const refreshTokenResponse = await axios.get(
              `${options.baseURL}/auth/refresh`,
              {
                headers: {
                  'X-Date': hmacToken.xDate,
                  'client-authorization': hmacToken.hmacToken,
                  Authorization: `Bearer ${this.refreshToken}`,
                },
              }
            );
            if (refreshTokenResponse?.data?.token) {
              if (this?.refreshTokenCallback) {
                this.authToken = refreshTokenResponse.data.token;
                await this.refreshTokenCallback(
                  refreshTokenResponse.data.token
                );
              }
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${refreshTokenResponse.data.token}`,
              };
            } else {
              this.authToken = null;
              this.refreshToken = null;
              if (this?.forceLogoutCallback) await this.forceLogoutCallback();
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            this.authToken = null;
            this.refreshToken = null;
            if (this?.forceLogoutCallback) await this.forceLogoutCallback();
          }
        }
        return config;
      }
    );
  }
  login({ keyid, password, refreshExpiresIn }: LoginDto) {
    const loginDto = refreshExpiresIn
      ? {
          keyid,
          password,
          refreshExpiresIn,
        }
      : {
          keyid,
          password,
        };
    return this.instance
      .post<LoginResponse>('/auth/login', loginDto)
      .then(response => {
        this.authToken = response.data.token;
        this.refreshToken = response?.data?.refresh;
        return response;
      })
      .catch(error => {
        return {
          ...error,
        };
      });
  }

  async updateAuthToken(refreshToken?: string) {
    const res = await this.instance.get<GetAuthTokenResponse>(`/auth/refresh`, {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
    return res;
  }

  get<T = unknown>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, options);
  }

  put<T = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  patch<T = unknown, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch<T, R>(url, data, config);
  }

  post<T = unknown, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }

  request<T = unknown>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(options);
  }

  static registerFunction<O = unknown, I = unknown>(
    options: FunctionOptions
  ): (input?: I) => Promise<AxiosResponse<O, I>> {
    return function (
      this: KrossClientBase,
      input?: I
    ): Promise<AxiosResponse<O>> {
      let url = '';

      /* replace `/api/user/:user_id` to `/api/user/120` when input.user_id is available
       *
       * For example
       *
       * => when creating a function
       * testFunction = registerFunction({url: '/api/user/:user_id', urlParam: 'user_id', method: 'get'})
       *
       * => when using the function
       * testFunction({user_id: 27})
       */
      if (options.urlParam) {
        const urlParam = (input as unknown as { [name: string]: string })[
          options.urlParam
        ];
        if (!urlParam) {
          throw new Error(`missing ${options.urlParam}`);
        }
        url = options.url.replace(`:${options.urlParam}`, urlParam);
      } else {
        url = options.url;
      }
      const paramsAndDataObject =
        options.method === 'get' ? { params: input } : { data: input };
      return this.request({
        url,
        method: options.method,
        ...paramsAndDataObject,
      });
    };
  }
}
