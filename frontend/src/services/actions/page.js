// services/actions/pages.js
// import axios from 'axios';
import { RSAA } from 'redux-api-middleware';

export const GET_MAIN_MENU_REQUEST = '@@page/GET_MAIN_MENU_REQUEST';
export const GET_MAIN_MENU_SUCCESS = '@@page/GET_MAIN_MENU_SUCCESS';
export const GET_MAIN_MENU_FAILURE = '@@page/GET_MAIN_MENU_FAILURE';

export const GET_PAGE_REQUEST = '@@page/GET_PAGE_REQUEST';
export const GET_PAGE_SUCCESS = '@@page/GET_PAGE_SUCCESS';
export const GET_PAGE_FAILURE = '@@page/GET_PAGE_FAILURE';

export const GET_PAGES_REQUEST = '@@page/GET_PAGES_REQUEST';
export const GET_PAGES_SUCCESS = '@@page/GET_PAGES_SUCCESS';
export const GET_PAGES_FAILURE = '@@page/GET_PAGES_FAILURE';

export const GET_PAGE_TYPE_REQUEST = '@@page/GET_PAGE_TYPE_REQUEST';
export const GET_PAGE_TYPE_SUCCESS = '@@page/GET_PAGE_TYPE_SUCCESS';
export const GET_PAGE_TYPE_FAILURE = '@@page/GET_PAGE_TYPE_FAILURE';

export const GET_PAGE_CHILDREN_REQUEST = '@@page/GET_PAGE_CHILDREN_REQUEST';
export const GET_PAGE_CHILDREN_SUCCESS = '@@page/GET_PAGE_CHILDREN_SUCCESS';
export const GET_PAGE_CHILDREN_FAILURE = '@@page/GET_PAGE_CHILDREN_FAILURE';

export const fetchMainMenu = () => ({
  [RSAA]: {
    endpoint: '/api/v2/pages/?child_of=3&format=json&show_in_menus=true',
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    types: [GET_MAIN_MENU_REQUEST, GET_MAIN_MENU_SUCCESS, GET_MAIN_MENU_FAILURE]
  }
});

export const fetchAllPages = () => ({
  [RSAA]: {
    endpoint: `/api/v2/pages/`,
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    types: [GET_PAGES_REQUEST, GET_PAGES_SUCCESS, GET_PAGES_FAILURE]
  }
});

export const fetchPageMeta = slug => ({
  [RSAA]: {
    endpoint: `/api/v2/pages/?slug=${slug}&fields=*`,
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    types: [GET_PAGE_REQUEST, GET_PAGE_SUCCESS, GET_PAGE_FAILURE]
  }
});

export const fetchPageType = (type, slug) => ({
  [RSAA]: {
    endpoint: `/api/v2/pages/?type=${type}&slug=${slug}&fields=*`,
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    types: [GET_PAGE_TYPE_REQUEST, GET_PAGE_TYPE_SUCCESS, GET_PAGE_TYPE_FAILURE]
  }
});

export const fetchPageChildren = id => ({
  [RSAA]: {
    endpoint: `/api/v2/pages/?child_of=${id}`,
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    types: [
      GET_PAGE_CHILDREN_REQUEST,
      GET_PAGE_CHILDREN_SUCCESS,
      GET_PAGE_CHILDREN_FAILURE
    ]
  }
});
