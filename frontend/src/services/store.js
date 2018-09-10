import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';

import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import Immutable from 'immutable';

import rootReducer from './reducers';
const initialState = Immutable.Map();

export const history = createBrowserHistory();
const middleware = [apiMiddleware, thunk, routerMiddleware(history)];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
