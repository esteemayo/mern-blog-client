import * as actions from './AuthTypes';

const AuthReducer = (state, { type, payload }) => {
  if (type === actions.LOGIN_START) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: true,
    };
  }

  if (type === actions.LOGIN_SUCCESS) {
    return {
      ...state,
      user: payload,
      error: false,
      isFetching: false,
    };
  }

  if (type === actions.LOGIN_FAILURE) {
    return {
      ...state,
      user: null,
      error: true,
      isFetching: false,
    };
  }

  if (type === actions.LOGOUT) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: false,
    };
  }

  if (type === actions.UPDATE_START) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      user: payload,
      isFetching: false,
      error: false,
    };
  }

  if (type === actions.UPDATE_FAILURE) {
    return {
      ...state,
      user: state.user,
      error: true,
      isFetching: false,
    };
  }

  throw new Error('No matching action type');
};

export default Reducer;
