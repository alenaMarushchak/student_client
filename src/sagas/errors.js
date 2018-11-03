import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import constants from '../constants';
import actions from '../actions';
// import validator from 'services/validator.js'

const {
    API_ERROR_SAGA,
    VALIDATE_ERROR_SAGA,
    ERROR_TYPE_REQUEST,
    LOGIN_SAGA
} = constants;

const {
    addErrors,
    logoutSaga,
    toast
} = actions;

// Error handler types
const TOAST_HANDLER = 'TOAST_HANDLER';
const STATE_HANDLER = 'STATE_HANDLER';

const formErrorMessages = (type, response) => {
    let errors = [];
    let handler = null;
    switch (type) {
        case ERROR_TYPE_REQUEST:
            break;
        case LOGIN_SAGA:
            errors = response.data.message;
            handler = null;
            break;
        default:
            break;
    }
    return [handler, errors]
};

function* handleResponseByStatus(response) {
    const status = response && response.status;
    switch (status) {
        case 401:
            yield put(logoutSaga());
            break;
        case 500:
            yield put(toast.warning('Internal server error'));
            break;
        default:
    }
}

function* handleErrors(requestType, handler, errors, response) {
    yield call(handleResponseByStatus, response);
    switch (handler) {
        case TOAST_HANDLER:
            yield put(toast.error(errors));
            break;
        case STATE_HANDLER:
            yield put(addErrors(requestType, errors));
            break;
    }
}

// handlers
function* handleApiError({
                             requestType, response
                         }) {
    try {
        const [handler, errors] = formErrorMessages(requestType, response);
        yield call(handleErrors, requestType, handler, errors, response);
    } catch (e) {
        console.error(e);
    }
}

function* handleValidateError({
                                  requestType,
                                  errors
                              }) {
    const handler = STATE_HANDLER;
    yield call(handleErrors, `${requestType}_FRONTEND`, handler, errors)
}

// SAGAS
function* handleApiErrorSaga() {
    yield takeEvery(API_ERROR_SAGA, handleApiError)
}

function* handleValidateErrorSaga() {
    yield takeEvery(VALIDATE_ERROR_SAGA, handleValidateError)
}

export {
    handleApiErrorSaga,
    handleValidateErrorSaga
};

