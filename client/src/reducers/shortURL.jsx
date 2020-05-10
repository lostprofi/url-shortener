import { URL_SHORTENED, RESET_INIT_URL_DATA_OBJ, SIGN_OUT } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case URL_SHORTENED:
      sessionStorage.setItem('links', JSON.stringify([...state, action.payload]));
      return [action.payload, ...state];

    case RESET_INIT_URL_DATA_OBJ:
      return [...action.payload, ...state];

    case SIGN_OUT:
      return [];
    default:
      return state;
  }
};
