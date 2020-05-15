import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import shortURL from './shortURL';
import searchByTag from './searchingByTag';


const rootReducer = combineReducers({
  alerts: alertReducer,
  userAuth: authReducer,
  URLDataArrObj: shortURL,
  searchedLinksBytag: searchByTag,
});

export default rootReducer;
