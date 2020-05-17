import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import shortURL from './shortURL';
import searchByTag from './searchingByTag';
import getDataForStat from './statistic';

const rootReducer = combineReducers({
  alerts: alertReducer,
  userAuth: authReducer,
  currentURLDataArrObj: shortURL,
  searchedLinksBytag: searchByTag,
  dataForStat: getDataForStat,
});

export default rootReducer;
