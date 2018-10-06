import constants from '../constants';

const {
  API_ERROR_SAGA,
  ERROR_TYPE_REQUEST,
  VALIDATE_ERROR_SAGA,
  LOGIN_SAGA,
  LOGOUT_SAGA,
  LOGIN_FROM_STORE,
  TOAST_SAGA,
  LOAD_USERS_SAGA,
  LOAD_USER_SAGA,
  DELETE_USERS_SAGA,
  UPDATE_USER_SAGA,
} = constants;

export const addRequestError = (response) => {
  return {
    type: API_ERROR_SAGA,
    requestType: ERROR_TYPE_REQUEST,
    response
  }
};

export const addErrorsSaga = (requestType, response) => ({
  type: API_ERROR_SAGA,
  requestType,
  response
});

export const addValidateError = (requestType, errors) => ({
  type: VALIDATE_ERROR_SAGA,
  requestType,
  errors
});


export const loginSaga = () => ({
  type: LOGIN_SAGA
});

export const logoutSaga = () => ({
  type: LOGOUT_SAGA
});

export const loginFromStore = () => ({
  type: LOGIN_FROM_STORE
});

// Toasts
const defaultToast = (toastType, node) => ({
  type: TOAST_SAGA,
  toastType,
  node
});

const toastTypes = constants.toast.type;

const info = (node) => ({
  ...defaultToast(toastTypes.INFO, node)
});

const warning = (node) => ({
  ...defaultToast(toastTypes.WARNING, node)
});

const error = (node) => ({
  ...defaultToast(toastTypes.ERROR, node)
});

const success = (node) => ({
  ...defaultToast(toastTypes.SUCCESS, node)
});

export const toast = {
  default: defaultToast,
  info,
  warning,
  error,
  success
};

export const loadUsersSaga = (page = 0, filters = {}) => ({
  type: LOAD_USERS_SAGA,
  page,
  filters
});

export const loadUserSaga = (id) => ({
  type: LOAD_USER_SAGA,
  id
});

export const deleteUsersSaga = (listForDelete = []) => ({
  type: DELETE_USERS_SAGA,
  listForDelete
});


