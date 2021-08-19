import React, { useContext, useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

import {
  LOGOUT,
  LOGIN_START,
  UPDATE_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_FAILURE,
  UPDATE_SUCCESS,
} from './Types';
import Reducer from './Reducer';

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

  const loginStart = (userCredentials) => {
    dispatch({ type: LOGIN_START });
  };

  const loginSuccess = (userData) => {
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData,
    });
  };

  const loginFailure = () => {
    dispatch({ type: LOGIN_FAILURE });
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    dispatch({ type: LOGOUT });
  };

  const updateStart = (userCredentials) => {
    dispatch({ type: UPDATE_START });
  };

  const updateSuccess = (userData) => {
    localStorage.setItem(tokenKey, userData.token);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: userData,
    });
  };

  const updateFailure = () => {
    dispatch({ type: UPDATE_FAILURE });
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

export { AppContext, AppProvider };
