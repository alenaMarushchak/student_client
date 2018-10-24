import {push} from 'react-router-redux';

export function checkHttpStatus(response, dispatch) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    if (isUnauthorized(error)) {
        sendToLogin(dispatch);
    }

    throw error;
}

export function isUnauthorized(error) {
    return error.response && error.response.status === 401;
}

export function sendToLogin(dispatch) {
    dispatch(push('/sign_in'));
}