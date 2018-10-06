import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';
import {push} from 'react-router-redux';

import constants from '../constants';
import actions from '../actions';
import stories from './stories';

const {
    loginStory,
    logoutStory
} = stories;

const {
    addErrorsSaga,
    toast
} = actions;

const {
    LOGIN_SAGA,
    LOGOUT_SAGA,
} = constants;

function* login({}) {
    try {
        const {email, password} = yield select(store => store.form.login.values);

        const user = yield call(loginStory, email, password);

        yield put(toast.success(`Hello ${user.firstName} ${user.lastName}`));

    } catch (e) {
        console.error(e);
        yield put(toast.error(`Email or password is incorrect`));
        yield put(addErrorsSaga(LOGIN_SAGA, e.response))
    }
}

function* logout() {
    try {
        yield call(logoutStory)
    } catch (e) {
        console.error(e);
    }
}

function* loginSaga() {
    yield takeLatest(LOGIN_SAGA, login);
}

function* logoutSaga() {
    yield takeLatest(LOGOUT_SAGA, logout)
}


export {loginSaga, logoutSaga};

