import http from './httpService';

const apiEndPoint = '/categories';

export const getCategories = (token) =>
  http.get(apiEndPoint, { cancelToken: token });

export const createCategory = (category) =>
  http.post(apiEndPoint, category);
