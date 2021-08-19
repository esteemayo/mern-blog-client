import {
  LOGOUT,
  LOGIN_START,
  UPDATE_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_FAILURE,
  UPDATE_SUCCESS,
} from './Types';

const Reducer = (state, action) => {
  if (action.type === LOGIN_START) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: true,
    };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      error: false,
      isFetching: false,
    };
  }

  if (action.type === LOGIN_FAILURE) {
    return {
      ...state,
      user: null,
      error: true,
      isFetching: false,
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: false,
    };
  }

  if (action.type === UPDATE_START) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (action.type === UPDATE_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      isFetching: false,
      error: false,
    };
  }

  if (action.type === UPDATE_FAILURE) {
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
