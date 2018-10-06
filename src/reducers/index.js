import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as sessionReducer from './session.js';
import * as errorReducer from './errors.js';
import * as usersReducer from './users.js';
import * as modalReducer from './modal.js';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  ...sessionReducer,
  ...errorReducer,
  ...usersReducer,
  ...modalReducer
});

export default rootReducer;

