import http from './httpService';

const apiEndPoint = '/categories';

export function getCategories() {
  return http.get(apiEndPoint);
};

export function createCategory(category) {
  return http.post(apiEndPoint, category);
};
