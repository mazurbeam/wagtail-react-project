// src/services/reducers/index.js

import { combineReducers } from 'redux';

import page, * as fromPage from './page';

const rootReducer = combineReducers({
  page
});

export const refreshPage = state => fromPage.refreshPageState(state.page);
export const refreshMenu = state => fromPage.refreshMenu(state.page);
export const refreshPageChildren = state =>
  fromPage.refreshPageChildren(state.page);

export default rootReducer;
