import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';

export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
