
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTIC':
      return [...state, ...action.payload];

    case 'CLEAR_DATA_FOR_STAT':
      return initialState;

    default:
      return state;
  }
};
