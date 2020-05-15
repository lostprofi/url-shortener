import axios from 'axios';
import Cookies from 'js-cookie';
import { TAG_ADDED } from './actionTypes';
import alert from './alert';

export default (shortenURL, tag) => async (dispatch) => {
  try {
    const body = {
      shortenURL,
      tag,
    };

    const userToken = Cookies.get('userToken');

    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': userToken,
      },
    };

    const res = await axios.post('/addTag', body, config);

    dispatch(alert(res.data, 'success'));

    dispatch({
      type: TAG_ADDED,
      payload: {
        tag,
        shortenURL,
      },
    });
  } catch (err) {
    const { errors } = err.response;

    errors.forEach((el) => dispatch(alert(el.msg, 'error')));
  }
};
