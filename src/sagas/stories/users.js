import axios from 'axios';
import { call } from 'redux-saga/effects';
import constants from 'constants';

const {
  API_USERS,
} = constants;

const apiLoadUsers = (filters) => (
  axios.get(API_USERS, {
    params: {
      ...filters
    }
  })
)

const apiLoadUser = (id) => (
  axios.get(`${API_USERS}/${id}`)
)

const apiDeleteUsers = (listForDelete) => (
  axios.put(`${API_USERS}/block`, {
    ids: listForDelete
  })
)

function* loadUsersStory(filters) {
   return yield call(apiLoadUsers, { ...filters, limit: 5 })
}

function* loadUserStory(id) {
  return yield call(apiLoadUser, id)
}

function* deleteUsersStory(listForDelete) {
  const response = yield call(apiDeleteUsers, listForDelete);
}

export { loadUsersStory, loadUserStory, deleteUsersStory };
