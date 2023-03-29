export const tokenKey = 'token';

export const getFromStorage = (key) => {
  if (typeof window !== 'undefined')
  return JSON.parse(localStorage.getItem(key));
}

export const setToStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const removeFromStorage = (key) =>
  localStorage.removeItem(key);
