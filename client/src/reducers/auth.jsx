import Cookies from 'js-cookie';
import {
  AUTH_SUCCESS, AUTH_ERROR, SIGN_OUT,
} from '../actions/actionTypes';


const initialState = {
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:

      // localStorage.setItem('userToken', action.payload.token);
      Cookies.set('userToken', `${action.payload.token}`, { expires: 7, path: '/', samesite: 'strict' });
      return { ...state, isAuth: true };

    case AUTH_ERROR: return { ...state, isAuth: false };

    case SIGN_OUT:
      Cookies.remove('userToken', '/');
      return {
        ...state, isAuth: false,
      };

    default: return state;
  }
};
