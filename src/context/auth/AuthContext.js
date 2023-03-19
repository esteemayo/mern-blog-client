import jwtDecode from 'jwt-decode';
import React, { useContext, useReducer, createContext } from 'react';

import Reducer from './AuthReducer';
import { getJwt } from 'services/userService';
import * as actions from './AuthTypes';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'utils';

const token = getJwt();
const user = getFromStorage(tokenKey)

const initialState = {
  user: user ?? null,
  error: false,
  isFetching: false,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = Date.now();

  if (expiredToken > decodedToken.exp * 1000) {
    removeFromStorage(tokenKey);
    initialState.user = null;
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const loginStart = () => {
    dispatch({
      type: actions.LOGIN_START,
    });
  };

  const loginSuccess = (userData) => {
    localStorage.setItem(tokenKey, userData);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: userData,
    });
  };

  const loginFailure = () => {
    dispatch({
      type: actions.LOGIN_FAILURE,
    });
  };

  const logout = () => {
    removeFromStorage(tokenKey);
    dispatch({
      type: actions.LOGOUT,
    });
  };

  const updateStart = () => {
    dispatch({
      type:
        actions.UPDATE_START,
    });
  };

  const updateSuccess = (userData) => {
    setToStorage(tokenKey, userData);
    dispatch({
      type: actions.UPDATE_SUCCESS,
      payload: userData,
    });
  };

  const updateFailure = () => {
    dispatch({
      type: actions.UPDATE_FAILURE,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        dispatch,
        loginStart,
        loginSuccess,
        loginFailure,
        updateStart,
        updateSuccess,
        updateFailure,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
