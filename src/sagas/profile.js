import { call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import { getFormValues } from 'redux-form';
import constants from '../constants';
import actions from '../actions';
import stories from './stories';
import validator from '../services/validator';

const {
  loadUserStory,
  updateSessionStory
} = stories;

const {
  addErrorsSaga,
  toast,
  addValidateError,
  cleanErrors
} = actions;

const {
  UPDATE_USER_SAGA,
  API_PROFILE
} = constants;

const apiUpdateUser = (data) => (
  axios.put(API_PROFILE, data)
);

const formatData = (json) => {
  let data = new FormData();

  Object.keys(json).forEach(field => {
    data.append(`${field}`, json[field]);
  })
  return data;
}

function* validateUser(data) {
  const errors = validator.validate(data, 'profile');
  if (errors) {
    yield put(addValidateError(UPDATE_USER_SAGA, errors));
    return false;
  } else {
    yield put(cleanErrors(UPDATE_USER_SAGA))
    return true;
  }
}

function* _updateUser({
  fields
}) {
  try {
    const generatedFields = yield select(store => (getFormValues('profile')(store)));
    const jsonData = {
      firstName: generatedFields.firstName,
      lastName: generatedFields.lastName,
      email: generatedFields.email,
      avatar: fields.avatar
    };

    const isValid = yield call(validateUser, jsonData);
    if (!isValid) return;

    const data = yield call(formatData, jsonData);
    const response = yield call(apiUpdateUser, data);
    const [user, token] = yield select(store => [store.session.user, store.session.token]);
    const loadedUser = response.data;
    yield call(updateSessionStory, loadedUser, token);
    yield put(toast.success('Profil mis à jour avec succès'))
  } catch (e) {
    yield put(addErrorsSaga(UPDATE_USER_SAGA, e.response));
    console.error(e);
  }
}


function* updateUserSaga() {
  yield takeEvery(UPDATE_USER_SAGA, _updateUser);
}
export { updateUserSaga };
