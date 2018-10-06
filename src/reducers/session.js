import _ from 'lodash';

import constants from '../constants';
const {
  UPDATE_SESSION,
  SESSION_LOGOUT
} = constants;

const session = (session = {
    user: {},
    token: null,
    logged: undefined
  }, action) => {
  switch(action.type) {
    case UPDATE_SESSION:
      const newData = { ...session,
        ...action.payload
      }
      return {
        ...newData,
        logged: !!(!_.isEmpty(newData.user) && newData.token)
      }
    case SESSION_LOGOUT:
      return {
        ...session,
        user: {},
        logged: false,
        token: null
      }
    default: return session;
  }
}

export { session };
