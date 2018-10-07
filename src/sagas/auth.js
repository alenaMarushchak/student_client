import {call, put, takeLatest, select} from 'redux-saga/effects'
import _ from 'lodash';
import auth from '../services/auth';
import actions from '../actions';
import stories from './stories';
import constants from '../constants'

let {
    loginStory,
    logoutStory
} = stories;

let {
    LOGIN_SAGA,
    LOGOUT_SAGA,
    LOGIN_FROM_STORE
} = constants;

let {
    addErrorsSaga,
    toast,
    updateSession
} = actions;

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

function* loginFromStore() {
    try {
        const {
            user
        } = auth.retrieveSession();

        if (!_.isEmpty(user)) {
            yield put(updateSession(user));
        }
    } catch (e) {
        console.error(e);
    }
}

function* loginFromStoreSaga() {
    yield takeLatest(LOGIN_FROM_STORE, loginFromStore)
}

export {loginSaga, logoutSaga, loginFromStoreSaga};
