import {call, put, select, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';
import auth from '../services/auth';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';
import validator from "../services/validator";

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
    updateSession,
    addValidateError,
    cleanErrors,
} = actions;

function* validateUser(data, type, action) {
    const errors = validator.validate(data, type);

    if (errors) {
        yield put(addValidateError(action, errors));
        return false;
    } else {
        yield put(cleanErrors(action));
        return true;
    }
}

function* loginAsync() {
    try {
        yield put(requestLogin());
        const {email, password} = yield select(store => store.form.login.values);

        let data = {
            email, password
        };

        const isValid = yield call(validateUser, data, 'authorize', LOGIN);

        if (!isValid) return;

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
        yield put(toast.error(`Email or password is incorrect!`));
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