import jwtDecode from 'jwt-decode';
import React, { useContext, useReducer, createContext } from 'react';

import Reducer from './AuthReducer';
import * as actions from './AuthTypes';

const initialState = {
  user: null,
  error: false,
  isFetching: false,
};

const tokenKey = 'token';
const token = localStorage.getItem(tokenKey);
if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = Date.now();

  if (expiredToken > decodedToken.exp * 1000) {
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const loginStart = () => {
    dispatch({
      type: actions.LOGIN_START,
    });
  };

  const loginSuccess = (userData) => {
    localStorage.setItem(tokenKey, userData.token);
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
    localStorage.removeItem(tokenKey);
    dispatch({
      type: actions.LOGOUT,
    });
  };

  const updateStart = () => {
    dispatch({ type: actions.UPDATE_START });
  };

  const updateSuccess = (userData) => {
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: actions.UPDATE_SUCCESS,
      payload: userData,
    });
  };

  const updateFailure = () => {
    dispatch({ type: actions.UPDATE_FAILURE });
  };

  return (
    <AppContext.Provider
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
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
