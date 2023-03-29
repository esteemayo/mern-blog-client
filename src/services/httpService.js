import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './userService';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_API_URL, REACT_APP_PROD_API_URL } = process.env;

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

const API = axios.create({
  baseURL: devEnv ? REACT_APP_DEV_API_URL : REACT_APP_PROD_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((req) => {
  req.headers.common['Authorization'] = `Bearer ${getJwt()}`;
  return req;
}, (error) => {
  return Promise.reject(error);
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

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
