import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { env } from '../env';

import jwtDefaultConfig from './jwt-default-config';

export type JwtServiceConfig = {
  baseURL?: string;
  tokenType?: string;
  storageTokenKeyName?: string;
};

export class JwtService {
  axin: AxiosInstance;

  jwtConfig = { ...jwtDefaultConfig };

  accessToken: string | null = this.getToken();

  isAlreadyFetchingAccessToken = false;

  subscribers: ((accessToken: string) => void)[] = [];

  constructor({ ...overrideServiceConfig }: JwtServiceConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...overrideServiceConfig };

    this.axin = axios.create({
      baseURL: this.jwtConfig.baseURL || env.baseApiUrl || '',
      // withCredentials: true, // WAJIB untuk HttpOnly Cookie
      headers: { 'Content-Type': 'application/json' },
    });

    this.axin.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axin.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config } = error;
        // const { config, response } = error;
        // const originalRequest = config;

        if (config.url === this.jwtConfig.loginUrl || config.url === this.jwtConfig.refreshTokenUrl) {
          return Promise.reject(error);
        }

        // Cek jika error 401 dan bukan request refresh itu sendiri yang error
        // if (response.status === 401 && !originalRequest.retry) {
        //   if (!this.isAlreadyFetchingAccessToken) {
        //     this.isAlreadyFetchingAccessToken = true;

        //     this.refreshToken()
        //       .then((res) => {
        //         this.isAlreadyFetchingAccessToken = false;
        //         const newVisibleToken = res.data.accessToken;
        //         this.setToken(newVisibleToken);
        //         this.onAccessTokenFetched(newVisibleToken);
        //       })
        //       .catch((err) => {
        //         this.isAlreadyFetchingAccessToken = false;
        //         this.subscribers = []; // Bersihkan antrean jika refresh gagal
        //         this.removeToken();
        //         return Promise.reject(err);
        //       });
        //   }

        //   // Flag agar request ini tidak mengulang refresh jika nanti gagal lagi
        //   originalRequest.retry = true;

        //   return new Promise((resolve) => {
        //     this.addSubscriber((token: string) => {
        //       originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${token}`;
        //       resolve(this.axin(originalRequest));
        //     });
        //   });
        // }

        return Promise.reject(error);
      },
    );
  }

  get<TResponse = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResponse>> {
    return this.axin.get(url, config);
  }

  post<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axin.post(url, data, config);
  }

  put<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axin.put(url, data, config);
  }

  patch<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axin.patch(url, data, config);
  }

  delete<TResponse = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResponse>> {
    return this.axin.delete(url, config);
  }

  onAccessTokenFetched(accessToken: string) {
    this.subscribers.forEach((callback) => callback(accessToken));
    this.subscribers = [];
  }

  addSubscriber(callback: (token: string) => void) {
    this.subscribers.push(callback);
  }

  getToken(): string | null {
    const existingToken = localStorage.getItem(this.jwtConfig.storageTokenKeyName);

    return existingToken ? JSON.parse(existingToken) : null;
  }

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, JSON.stringify(token));
  }

  removeToken() {
    this.accessToken = null;
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
  }

  refreshToken(): Promise<AxiosResponse> {
    // Gunakan axios instance murni atau instance tanpa interceptor
    // agar tidak terjadi loop jika endpoint refresh return 401
    return this.axin.post(this.jwtConfig.refreshTokenUrl, {}, {});
  }

  login(credentials: any) {
    return this.axin.post(this.jwtConfig.loginUrl, credentials);
  }

  register(credentials: any) {
    return this.axin.post(this.jwtConfig.registerUrl, credentials);
  }

  logout() {
    this.removeToken();
  }
}

export const createJwt = (jwtConfig: JwtServiceConfig) => new JwtService(jwtConfig);
