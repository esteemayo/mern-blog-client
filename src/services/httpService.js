import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

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

const setJwt = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

export default http;
