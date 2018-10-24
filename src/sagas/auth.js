import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import _ from 'lodash';
import auth from '../services/auth';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_LOGIN,
    API_LOGOUT,
    LOGIN,
    LOGOUT,
    LOGIN_FROM_STORE
} = constants;

const {
    requestLogin,
    requestLoginSuccess,
    requestLoginError,
    toast,
    updateSession
} = actions;

function* loginAsync() {
    try {
        yield put(requestLogin());
        const {email, password} = yield select(store => store.form.login.values);
        const user = yield call(() => {
            return axios.post(API_LOGIN, {
                email,
                password
            }).then(res => res.data)
        });

        auth.storeSession(user);

        yield put(toast.success(`Hello ${user.firstName} ${user.lastName}`));

        yield put(requestLoginSuccess(user));
    } catch (error) {
        yield put(requestLoginError(error));
    }
}

function* logoutAsync() {
    yield call(() => {
        return axios.delete(API_LOGOUT)
    });

    auth.storeSession({});
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

function* loginSaga() {
    yield takeLatest(LOGIN, loginAsync);
}

function* logoutSaga() {
    yield takeLatest(LOGOUT, logoutAsync);
}

function* loginFromStoreSaga() {
    yield takeLatest(LOGIN_FROM_STORE, loginFromStore)
}

export {loginSaga, logoutSaga, loginFromStoreSaga}