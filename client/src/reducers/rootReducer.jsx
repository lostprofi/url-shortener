import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';


const rootReducer = combineReducers({
  alerts: alertReducer,
  userAuth: authReducer,
});

export default rootReducer;
