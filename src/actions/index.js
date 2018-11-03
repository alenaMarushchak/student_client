import * as reducerActions from './reducerActions'
import * as sagaActions from './sagaActions'

const globalActions = {
  ...reducerActions,
  ...sagaActions
};

export default globalActions;
