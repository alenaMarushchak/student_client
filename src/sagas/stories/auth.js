import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import constants from '../../constants';
import actions from '../../actions';

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
    axios.delete(API_LOGOUT)
);

function* loginStory(email, password) {
    const response = yield call(apiLogin, email, password);

    const user = response.data;

    yield call(updateSessionStory, user);

    return user;
}

function* updateSessionStory(user) {
    yield put(updateSession(user));

    return user;
}

function* logoutStory() {
    yield call(apiLogout);
    yield put(sessionLogout());
}

export {loginStory, logoutStory, updateSessionStory};
