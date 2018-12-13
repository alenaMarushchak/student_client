import { call,  takeEvery, } from 'redux-saga/effects';
import React from 'react';
import { toast } from 'react-toastify';
import constants from '../constants';
import { Success, Info, Warning, Error } from '../components/Toasts';

const {
    TOAST_SAGA
} = constants;

const toastTypes = constants.toast.type;

const toastByType = {
    [toastTypes.SUCCESS]: toast.success,
    [toastTypes.WARNING]: toast.warn,
    [toastTypes.INFO]: toast.info,
    [toastTypes.ERROR]: toast.error
};

const componentByType = {
    [toastTypes.SUCCESS]: Success,
    [toastTypes.WARNING]: Warning,
    [toastTypes.INFO]: Info,
    [toastTypes.ERROR]: Error
};

function* showToast({ toastType, node }) {
    try {
        const ToastComp = componentByType[toastType];
        yield call(
            toastByType[toastType],
            <ToastComp>{node || false}</ToastComp>
        )
    } catch (e) {
        // eslint-disable-next-line no-use-before-define
        console.error(e); // eslint-disable-line no-use-before-define
    }
}

function* toastSaga() {
    yield takeEvery(TOAST_SAGA, showToast);
}

export {
    toastSaga
};
