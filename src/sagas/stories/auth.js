import axios from 'axios';
import {call, put} from 'redux-saga/effects';
import constants from '../../constants';
import actions from '../../actions';
import auth from '../../services/auth';

const {
    updateSession,
    sessionLogout
} = actions;

const {
    API_LOGIN,
    API_LOGOUT
} = constants;

const apiLogin = (email, password) => (
    axios.post(API_LOGIN, {
        email,
        password
    })
);

const apiLogout = () => (
    axios.put(API_LOGOUT)
);

const writeAuthSessionToStorage = (user, token) => {
    auth.storeSession(user, token)
};

function* updateSessionStory(user) {
    yield put(updateSession(user));

    yield call(writeAuthSessionToStorage, user);
    return user;
}

function* loginStory(email, password) {
    const response = yield call(apiLogin, email, password);
    const user = response.data;

    yield call(updateSessionStory, user);
    return user;
}

function* logoutStory() {
    yield call(apiLogout);
    yield put(sessionLogout());

    yield call(writeAuthSessionToStorage, {});
}

export {loginStory, logoutStory};
