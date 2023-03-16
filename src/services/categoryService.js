import http from './httpService';

const apiEndPoint = '/categories';

export const getCategories = () => http.get(apiEndPoint);

export const createCategory = (category) =>
  http.post(apiEndPoint, category);
