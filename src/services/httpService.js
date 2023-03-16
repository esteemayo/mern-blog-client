import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

const API = axios.create({
  baseURL: devEnv ? REACT_APP_DEV_API_URL : REACT_APP_PROD_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  return API.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
  setJwt,
};

export default http;
