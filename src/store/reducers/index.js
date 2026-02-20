import { combineReducers } from 'redux';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  review: reviewReducer,
});

export default rootReducer;