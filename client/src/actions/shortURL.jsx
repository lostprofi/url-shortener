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

    dispatch({
      type: URL_SHORTENED,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((el) => dispatch(alert(el.msg, 'error')));
  }
};
