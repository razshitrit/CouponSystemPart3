import axios from 'axios';
import globalUrlService from './GlobalUrlService';
import store from '../Redux/Store';


const axiosInterceptor = axios.create({
  timeout: 10_000,
});

axiosInterceptor.interceptors.request.use(
  (config) => {

    const token = store.getState().auth.user.token;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
