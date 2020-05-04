import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';


const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
});

export default rootReducer;
