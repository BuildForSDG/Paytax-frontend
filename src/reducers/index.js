import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tax from './tax';

export default combineReducers({
  alert,
  auth,
  tax
});
