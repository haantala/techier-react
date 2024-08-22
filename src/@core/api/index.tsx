import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRoutes } from '../constants';

export const axios = Axios.create({
  baseURL: ApiRoutes.API_HOSTNAME,
  timeout: 1000000000,

  responseType: 'json',
});

axios.interceptors.request.use(
  async (config:any) => {
    config.headers = {
      Accept: 'application/json , */*',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response?.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

