import { combineReducers } from 'redux';
import notifications from './notifications';
import learning from './learning';

export default combineReducers({
  notifications,
  learning
});
