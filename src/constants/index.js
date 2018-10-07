import * as reducerConstants from './reducer.js';
import * as apiConstants from './api.js';
import * as sagaConstants from './saga.js';

const globalConstants = {
  ...reducerConstants,
  ...apiConstants,
  ...sagaConstants
};

export default globalConstants;
