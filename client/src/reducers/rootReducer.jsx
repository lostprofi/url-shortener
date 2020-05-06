import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import shortURL from './shortURL';


const rootReducer = combineReducers({
  alerts: alertReducer,
  userAuth: authReducer,
  URLDataArrObj: shortURL,
});

export default rootReducer;
