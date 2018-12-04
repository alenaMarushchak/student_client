import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import * as sessionReducer from './session.js';
import * as errorReducer from './errors.js';
import * as userReducer from './users.js';
import * as modalReducer from './modal.js';
import * as subjectReducer from './subjects.js';
import * as groupReducer from './groups.js';
import * as selectReducer from './select.js';
import * as studentReducer from './student.js';

const rootReducer = combineReducers({
    routing: routerReducer,
    form   : formReducer,
    ...sessionReducer,
    ...errorReducer,
    ...userReducer,
    ...modalReducer,
    ...subjectReducer,
    ...groupReducer,
    ...selectReducer,
    ...studentReducer
});

export default rootReducer;

