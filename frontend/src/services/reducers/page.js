// services/reducers/pages.js

import * as page from '../actions/page'

const initialState = {
  menu: [],
  meta: { meta: { type: '' } },
  pages: [],
  home: {},
  details: {},
  children: {},
  standard: [],
  blog: [],
  blogIndex: [],
  errors: {},
  documents: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case page.GET_HOME_SUCCESS:
      return {
        ...state,
        home: action.payload.items[0]
      }

    case page.GET_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.payload.items
      }
    case page.GET_MAIN_MENU_SUCCESS:
      return {
        ...state,
        menu: action.payload.items
      }
    case page.GET_PAGE_ID_SUCCESS: {
      const newDetails = state.details
      const key = action.payload.id
      newDetails[key] = action.payload
      return {
        ...state,
        details: newDetails
      }
    }

    case page.GET_PAGE_ID_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case page.GET_MAIN_MENU_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case page.GET_PAGE_META_SUCCESS: {
      // const newMeta = state.meta
      // const key = action.meta
      // newMeta[key] = action.payload
      return {
        ...state,
        meta: action.payload.items[0]
      }
    }

    case page.GET_PAGE_TYPE_SUCCESS:
      return {
        ...state,
        details: action.payload
      }
    case page.GET_PAGE_CHILDREN_SUCCESS: {
      console.log(action)
      const newChildren = state.children
      const key = action.meta
      newChildren[key] = action.payload
      return {
        ...state,
        children: newChildren
      }
    }

    case page.GET_PAGE_META_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case page.GET_PAGE_TYPE_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case page.GET_PAGE_CHILDREN_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}

export function refreshPageState (state, id) {
  if (state.details) {
    if (Object.prototype.hasOwnProperty.call(state.details, id)) {
      console.log('has page', state.details[id])
      return state.details[id]
    }
  }
  return null
}

export function refreshHomePage (state) {
  if (state.home) {
    return state.home
  }
  return null
}

export function refreshPageMeta (state) {
  if (state.meta) {
    return state.meta
  }
  return null
}

export function refreshPageMetaFromMenu (state, slug) {
  if (state.menu) {
    const meta = state.menu.filter(item => item.meta.slug === slug)
    return meta
  }
  return null
}

export function refreshPageChildren (state, id) {
  if (state.children) {
    if (Object.prototype.hasOwnProperty.call(state.children, id)) {
      return state.children[id]
    }
  }
  return null
}

export function refreshMenu (state) {
  if (state.menu) {
    return state.menu
  }
  return null
}
