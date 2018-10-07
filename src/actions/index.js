import * as reducerActions from './reducers.js'
import * as sagaActions from './sagas.js'

const globalActions = {
  ...reducerActions,
  ...sagaActions
};

export default globalActions;
