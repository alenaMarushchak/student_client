import _ from 'lodash';

import constants from '../constants';
const {
    LOAD_USERS,
    LOAD_USER,
  CLEAN_DATA
} = constants;

const users = (users = {
  list: {
    values: [],
    page: 0,
    filters: {},
    totalPages: 0
  },
  selected: {
    value: {},
    transactions: {
      list: {
        values: [],
        page: 0,
        filters: {},
        totalPages: 0
      },
    }
  }
}, action) => {
  switch (action.type) {

    case LOAD_USERS:
      const {
        values,
        page,
        filters,
        totalPages
      } = action.payload;

      return {
        ...users,
        list: {
          ...users.list,
          values,
          page,
          filters,
          totalPages
        }
      };

    case `${CLEAN_DATA}_${LOAD_USERS}`:
      return {
        ...users,
        list: {
          ...users.list,
          values: [],
        }
      };

    case LOAD_USER:
      return {
        ...users,
        selected: {
          ...users.selected,
          value: action.payload.value
        }
      };

    case `${CLEAN_DATA}_${LOAD_USER}`:
      return {
        ...users,
        selected: {
          ...users.selected,
          value: {}
        }
      };

      default:
        return users;

  }
};

export { users };

