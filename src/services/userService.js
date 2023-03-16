import http from './httpService';

const tokenKey = 'token';
const apiEndPoint = '/users';
const tokenKey = 'token';

http.setJwt(getJwt());

export function registerUser(userData) {
  return http.post(`${apiEndPoint}/signup`, userData);
};

export function loginUser(userData) {
  return http.post(`${apiEndPoint}/login`, userData);
};

export function updateUserData(userData) {
  return http.patch(`${apiEndPoint}/update-me`, userData);
};

export function updateUserPassword(userData) {
  return http.patch(`${apiEndPoint}/update-my-password`, userData);
};

export function deleteCurrentUser() {
  return http.delete(`${apiEndPoint}/delete-me`);
};

function getJwt() {
  return localStorage.getItem(tokenKey);
};
