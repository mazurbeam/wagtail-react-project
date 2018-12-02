// src/services/reducers/index.js

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { snackbarReducer } from 'react-redux-snackbar' // Import it

import * as contact from '../actions/contact'
import page, * as fromPage from './page'

const rootReducer = combineReducers({
  page,
  form: formReducer.plugin({
    contact: (state, action) => {
      // <------ 'account' is name of form given to reduxForm()
      switch (action.type) {
        case contact.NEW_MESSAGE_SUCCESS:
          return undefined // <--- blow away form data
        default:
          return state
      }
    }
  }),
  snackbar: snackbarReducer
})

export const refreshHome = state => fromPage.refreshHomePage(state.page)
export const refreshPage = (state, id) =>
  fromPage.refreshPageState(state.page, id)
export const refreshMenu = state => fromPage.refreshMenu(state.page)
export const refreshPageChildren = (state, id) =>
  fromPage.refreshPageChildren(state.page, id)
export const refreshPageMeta = state => fromPage.refreshPageMeta(state.page)
export const refreshPageMetaFromMenu = (state, slug) =>
  fromPage.refreshPageMetaFromMenu(state.page, slug)

export default rootReducer
