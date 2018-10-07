import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import historyCreator from '../services/history';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(historyCreator.generateHistory());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(routerMiddleware),
  applyMiddleware(sagaMiddleware),
)(createStore);

const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export { sagaMiddleware, configureStore }

