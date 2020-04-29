import axios from 'axios';
import alert from './alert';

export default (name, email, password) => async (dispatch) => {
  try {
    const newUser = {
      name, email, password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(newUser);

    const res = await axios.post('/registration', body, config);

    dispatch(alert(res.data, 'success'));
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((el) => {
      dispatch(alert(el.msg, 'error'));
    });
  }
};
