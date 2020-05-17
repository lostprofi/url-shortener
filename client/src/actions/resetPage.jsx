import Cookies from 'js-cookie';

import {
  AUTHOR_SUCCESS, RESET_INIT_URL_DATA_OBJ, RELOAD_SEARCHING_BY_TAG,
} from './actionTypes';

export const resetInitUrldataObj = () => (dispatch) => {
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

export const resetSearchByTag = () => (dispatch) => {
  const findByTagsURL = JSON.parse(sessionStorage.getItem('findByTagURL'));

  dispatch({
    type: RELOAD_SEARCHING_BY_TAG,
    payload: findByTagsURL,
  });
};
