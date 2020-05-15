import axios from 'axios';
import { SEARCHING_BY_TAG } from './actionTypes';
import alert from './alert';


export default (tagName) => async (dispatch) => {
  try {
    const res = await axios.get(`/addTag?t=${tagName}`);

    dispatch({
      type: SEARCHING_BY_TAG,
      payload: res.data,
    });


  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((el) => {
      dispatch(alert(el.msg, 'error'));
    });
  }
};
