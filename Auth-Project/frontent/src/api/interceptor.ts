

import {api} from "./api";
import { RefreshToken } from "./auth.api";

import { store } from "../store/store";

import {
  setSucessRefresh,
  setNotSucessRefresh,
} from "../features/auth/authSlice";

import type {
  InternalAxiosRequestConfig,
} from "axios";

// Request ko dobara retry karne ka flag
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}


// 1. REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${accessToken}`,
      );
    }

    return config;
  },
);

// 2. RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
     

    return response;
  },

  async (error) => {
    const originalRequest =
      error.config as InternalAxiosRequestConfig | undefined;



    if (!originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    
    const isAuthRequest =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/verify-otp") ||
      url.includes("/auth/refresh");

    
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    // Is request ko sirf ek baar retry karna hai
    originalRequest._retry = true;

    try {
      
      
      const newAccessToken = await RefreshToken();


      
      store.dispatch(setSucessRefresh(newAccessToken));

      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`,
      );

   
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh fail: authentication clear karo
      store.dispatch(setNotSucessRefresh());

      return Promise.reject(refreshError);
    }
  },
);

export default api;