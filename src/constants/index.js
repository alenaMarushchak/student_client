import * as apiConstants from './api.js';
import * as actionTypes from './actionTypes.js';

const globalConstants = {
    ...apiConstants,
    ...actionTypes
};

export default globalConstants;
