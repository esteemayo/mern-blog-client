import http from './httpService';

const tokenKey = 'token';
const apiEndPoint = '/users';

http.setJwt(getJwt());

export const registerUser = (userData) => http.post(`${apiEndPoint}/signup`, userData);

export const loginUser = (userData) => http.post(`${apiEndPoint}/login`, userData);

export const updateUserData = (userData) =>
  http.patch(`${apiEndPoint}/update-me`, userData);

export const updateUserPassword = (userData) =>
  http.patch(`${apiEndPoint}/update-my-password`, userData);

export const deleteCurrentUser = () => http.delete(`${apiEndPoint}/delete-me`);

const getJwt = () => localStorage.getItem(tokenKey);
