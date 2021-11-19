import * as actions from './Types';

const Reducer = (state, action) => {
  if (action.type === actions.LOGIN_START) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: true,
    };
  }

  if (action.type === actions.LOGIN_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      error: false,
      isFetching: false,
    };
  }

  if (action.type === actions.LOGIN_FAILURE) {
    return {
      ...state,
      user: null,
      error: true,
      isFetching: false,
    };
  }

  if (action.type === actions.LOGOUT) {
    return {
      ...state,
      user: null,
      error: false,
      isFetching: false,
    };
  }

  if (action.type === actions.UPDATE_START) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (action.type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      isFetching: false,
      error: false,
    };
  }

  if (action.type === actions.UPDATE_FAILURE) {
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
