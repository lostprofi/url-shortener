import axios from 'axios';
import Cookies from 'js-cookie';
import alert from './alert';
import { GET_STATISTIC } from './actionTypes';

export default () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': Cookies.get('userToken'),
      },
    };

    const res = await axios.get('http://localhost:5000/shortener', config);

    dispatch({
      type: GET_STATISTIC,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((el) => {
      dispatch(alert(el.msg, 'error'));
    });
  }
};
