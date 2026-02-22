import { combineReducers } from 'redux';
import reviewReducer from './reviewReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  review: reviewReducer,
  auth: authReducer,
});

export default rootReducer;