import axios from 'axios';
import Cookies from 'js-cookie';
import alert from './alert';
import { URL_SHORTENED } from './actionTypes';

export default (fullURL) => async (dispatch) => {
  try {
    const userToken = Cookies.get('userToken');

    const body = {
      fullURL,
    };

    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': userToken,
      },
    };

    const res = await axios.post('/shortener', body, config);

    // check, is shorten URL is exist on listURL. IF yes -> alert, else render
    const fromSession = JSON.parse(sessionStorage.getItem('links'));

    const isMatchResInSession = fromSession.find((el) => el.fullURL === res.data.fullURL);

    if (isMatchResInSession) {
      dispatch(alert('Shorten version for this URL is exist', 'error'));
    } else {
      dispatch({
        type: URL_SHORTENED,
        payload: res.data,
      });
    }
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((el) => dispatch(alert(el.msg, 'error')));
  }
};
