import axios from 'axios';
import Cookies from 'js-cookie';
import alert from './alert';

import {
  AUTHN_SUCCESS, AUTHN_ERROR, AUTHR_SUCCESS, AUTHR_ERROR, SIGN_OUT
} from './actionTypes';

// load user data!!! 
export const authr = () => async (dispatch) => {
  try {
    const userToken = Cookies.get('userToken');

    if (userToken) {
      const config = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': userToken,
        },
      };

      const res = await axios.get('/auth', config);

      dispatch({
        type: AUTHR_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: AUTHR_ERROR,
      });
      throw new Error('User is not authoraized');
    }
  } catch (err) {

    dispatch({
      type: AUTHR_ERROR,
    });

    
  }
};

// user's authentification

export const authn = (email, password) => async (dispatch) => {
  const userData = {
    email,
    password,
  };

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = JSON.stringify(userData);

    const res = await axios.post('/auth', body, config);

    dispatch({
      type: AUTHN_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });

dispatch(authr());
  } catch (err) {
    const { errors } = err.response.data;

    dispatch({
      type: AUTHN_ERROR,
    });

    errors.forEach((el) => {
      dispatch(alert(el.msg, 'error'));
    });
  }
};

//sign out action

export const signOut = () => (
  {
    type: SIGN_OUT,
  }
);
