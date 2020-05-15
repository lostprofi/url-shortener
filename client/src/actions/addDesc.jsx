import axios from 'axios';
import Cookies from 'js-cookie';
import { DESC_ADDED } from './actionTypes';
import alert from './alert';

export default (shortenURL, description) => async (dispatch) => {
  try {
    const body = {
      shortenURL,
      description,
    };

    const userToken = Cookies.get('userToken');

    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': userToken,
      },
    };

    const res = await axios.post('/addDesc', body, config);

    dispatch(alert(res.data, 'success'));

    dispatch({
      type: DESC_ADDED,
      payload: {
        description,
        shortenURL,
      },
    });
  } catch (err) {
    const { errors } = err.response;

    errors.forEach((el) => dispatch(alert(el.msg, 'error')));
  }
};
