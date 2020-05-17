import axios from 'axios';
import alert from './alert';
import {
  AUTH_SUCCESS, AUTH_ERROR, SIGN_OUT,
} from './actionTypes';

// user's authentification

export const auth = (email, password) => async (dispatch) => {
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
      type: AUTH_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });
  } catch (err) {
    const { errors } = err.response.data;

    dispatch({
      type: AUTH_ERROR,
    });

    errors.forEach((el) => {
      dispatch(alert(el.msg, 'error'));
    });
  }
};

// sign out action

export const signOut = () => ({
  type: SIGN_OUT,
});
