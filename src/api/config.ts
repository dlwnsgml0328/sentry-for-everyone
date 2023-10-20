import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  withCredentials: true,
  timeout: 3000,
  timeoutErrorMessage: 'timeout 💣',
};

export const defaultAxios = axios.create(axiosConfig);
