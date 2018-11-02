// services/actions/contact.js

import { RSAA } from 'redux-api-middleware';
import Cookies from 'js-cookie';

export const NEW_MESSAGE_REQUEST = '@@contact/NEW_MESSAGE_REQUEST';
export const NEW_MESSAGE_SUCCESS = '@@contact/NEW_MESSAGE_SUCCESS';
export const NEW_MESSAGE_FAILURE = '@@contact/NEW_MESSAGE_FAILURE';

const csrftoken = Cookies.get('csrftoken')

export const createNewMessage = (name, email, message) => ({
  [RSAA]: {
    endpoint: 'api/v2/messages/',
    method: 'POST',
    body: JSON.stringify({
       name,
       email,
       message
    }),
    headers: { 'X-CSRFToken': csrftoken, "Content-Type": "application/json" },
    types: [NEW_MESSAGE_REQUEST, NEW_MESSAGE_SUCCESS, NEW_MESSAGE_FAILURE]
  }
})