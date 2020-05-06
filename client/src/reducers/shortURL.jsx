import { URL_SHORTENED } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case URL_SHORTENED:
      return [...state, action.payload];
    default:
      return state;
  }
};
