import { combineReducers } from 'redux';
import alertReducer from './alert';

const rootReducer = combineReducers({
  alerts: alertReducer,
});

export default rootReducer;
