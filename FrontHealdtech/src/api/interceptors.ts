import { api } from "./configAxios";
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const state = JSON.parse(authStorage).state;
      const token = state.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
}

const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
}

const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("auth-storage");
    window.location.href = "/login";
  }
  return Promise.reject(error);
}

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;

