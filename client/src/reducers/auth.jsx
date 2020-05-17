import Cookies from 'js-cookie';
import {
  AUTH_SUCCESS, AUTH_ERROR, SIGN_OUT, AUTHOR_SUCCESS,
} from '../actions/actionTypes';


const initialState = {
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:

      sessionStorage.setItem('links', JSON.stringify([]));
      // localStorage.setItem('userToken', action.payload.token);
      Cookies.set('userToken', `${action.payload.token}`, { expires: 7, path: '/', samesite: 'strict' });
      return { ...state, isAuth: true };

    case AUTHOR_SUCCESS:
      return { ...state, isAuth: true };

    case AUTH_ERROR: return { ...state, isAuth: false };

    case SIGN_OUT:
      Cookies.remove('userToken', '/');
      sessionStorage.clear('links');
      return {
        ...state, isAuth: false,
      };

    default: return state;
  }
};
