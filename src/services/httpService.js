import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getJwt } from './userService';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

axios.interceptors.request.use((req) => {
  req.headers.common['Authorization'] = `Bearer ${getJwt()}`;
  return req;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(null, (error) => {
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
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
