import { SEARCHING_BY_TAG, CLEAR_SEARCH_TAG_URL } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCHING_BY_TAG: {
      sessionStorage.setItem('findByTagURL', JSON.stringify([...state, ...action.payload]));
      return [...state, ...action.payload];
    }

    case 'RELOAD_SEARCHING_BY_TAG': {
      if (action.payload !== null) {
        return [...state, ...action.payload];
      }
      return state;
    }

    case CLEAR_SEARCH_TAG_URL:
      sessionStorage.setItem('findByTagURL', JSON.stringify([]));
      return initialState;

    default:
      return state;
  }
};
