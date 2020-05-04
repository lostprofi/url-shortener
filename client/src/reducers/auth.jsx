import Cookies from 'js-cookie';
import {
  AUTHN_SUCCESS, AUTHN_ERROR, AUTHR_SUCCESS, AUTHR_ERROR, SIGN_OUT,
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

      // localStorage.setItem('userToken', action.payload.token);
      Cookies.set('userToken', `${action.payload.token}`, { expires: 7, path: '/', samesite: 'strict' });
      return { ...state, isAuthenticated: true };

    case AUTHN_ERROR: return { ...state, isAuthenticated: false };
    case AUTHR_SUCCESS:
      return {
        ...state, isAuthenticated: true, isAuthorizated: true, userLoaded: true, user: action.payload,
      };
    case AUTHR_ERROR:
      return {
        ...state, isAuthorizated: false,
      };
    case SIGN_OUT:
      Cookies.remove('userToken', '/');
      return {
        ...state, isAuthorizated: false, isAuthenticated: true, userLoaded: false, user: null,
      };

    default: return state;
  }
};
