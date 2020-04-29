import {
  AUTHN_SUCCESS, AUTHN_ERROR, AUTHR_SUCCESS, AUTHR_ERROR,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userLoaded: false,
  isAuthorizated: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHN_SUCCESS:

      localStorage.setItem('userToken', action.payload.token);
      return { ...state, isAuthenticated: true };

    case AUTHN_ERROR: return { ...state, isAuthenticated: false };
    case AUTHR_SUCCESS:
      return {
        ...state, isAuthorizated: true, userLoaded: true, user: action.payload,
      };
    case AUTHR_ERROR:
      return {
        ...state, isAuthorizated: false,
      };
    default: return state;
  }
};
