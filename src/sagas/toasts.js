import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import React from 'react';
import { toast } from 'react-toastify';
import constants from '../constants';
import actions from '../actions';
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
}

const componentByType = {
  [toastTypes.SUCCESS]: Success,
  [toastTypes.WARNING]: Warning,
  [toastTypes.INFO]: Info,
  [toastTypes.ERROR]: Error
};

function* showToast({ toastType, node }) {
  try {
  const ToastComp = componentByType[toastType]
    yield call(
      toastByType[toastType],
      <ToastComp>{node || false}</ToastComp>
    )
  } catch (e) {
    console.error(e);
  }
}

function* toastSaga() {
  yield takeEvery(TOAST_SAGA, showToast);
}

export {
  toastSaga
};
