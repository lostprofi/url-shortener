
import Cookies from 'js-cookie';

import {
  AUTHOR_SUCCESS, RESET_INIT_URL_DATA_OBJ,
} from './actionTypes';

// authorization

export default () => (dispatch) => {
  const userToken = Cookies.get('userToken');

  if (userToken) {
    dispatch({
      type: AUTHOR_SUCCESS,
    });

    dispatch({
      type: RESET_INIT_URL_DATA_OBJ,
      payload: JSON.parse(sessionStorage.getItem('links')),
    });
  }
};
