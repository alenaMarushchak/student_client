import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { push } from 'react-router-redux';

import constants from '../constants';
import actions from '../actions';
import stories from './stories';
import { getFormValues } from 'redux-form';

const {
  loadUsersStory,
  loadUserStory,
  deleteUsersStory
} = stories;

const {
  loadUsers,
  loadUser,
  addRequestError,
  addErrors
} = actions;

const {
  LOAD_USERS_SAGA,
  LOAD_USER_SAGA,
  DELETE_USERS_SAGA
} = constants;

const getSearchValue = (store) => (
  (getFormValues('usersToolbar')(store) || { search: '' }).search
);

function* _loadUsers({ filters = {}, page = 0 }) {
  try {
    const [oldPage, oldFilters] = yield select(store => [
      store.users.list.page, store.users.list.filters
    ]);
    const search = yield select(getSearchValue);
    const newPage = (page > 0 ? page : oldPage);

    const apiFilters = {
      page: newPage ,
      search,
      ...oldFilters,
      ...filters,
    };

    const response = yield call(loadUsersStory, apiFilters);
    const users = response.data.data;
    const {
      pages,
      total,
      limit
    } = response.data.meta;
    yield put(loadUsers(users, newPage, filters, pages));
  } catch (e) {
    yield put(addRequestError(e.response));
    console.error(e);
  }
}

function* _loadUser({ id }) {
  try {
    const response = yield call(loadUserStory, id);
    const user = response.data;
    yield put(loadUser(user));
  } catch (e) {
    yield put(addRequestError(e.response));
    console.error(e);
  }
}

function* _deleteUsers({ listForDelete = [] }) {
  try {
    yield call(deleteUsersStory, listForDelete);
    yield call(_loadUsers, {})
  } catch (e) {
    yield put(addErrors(DELETE_USERS_SAGA, e.response));
    console.error(e);
  }
}

function* loadUsersSaga() {
  yield takeLatest(LOAD_USERS_SAGA, _loadUsers);
}

function* loadUserSaga() {
  yield takeLatest(LOAD_USER_SAGA, _loadUser)
}

function* deleteUsersSaga() {
  yield takeEvery(DELETE_USERS_SAGA, _deleteUsers)
}

export { loadUsersSaga, loadUserSaga, deleteUsersSaga };
