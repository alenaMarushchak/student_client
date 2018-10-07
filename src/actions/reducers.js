import constants from '../constants';

const {
  UPDATE_SESSION,
  SESSION_LOGOUT,
  ADD_ERRORS,
  CLEAN_ERRORS,
  LOAD_USERS,
  LOAD_USER,
  modal,
    CLEAN_DATA
} = constants;

export const updateSession = (user = null) => ({
  type: UPDATE_SESSION,
  payload: {
    ...(
      user ? { user } : {}
    )
  }
});

export const sessionLogout = () => ({
  type: SESSION_LOGOUT
});


export const addErrors = (requestType, errors) => {
  return {
    type: ADD_ERRORS,
    errors: errors,
    requestType: requestType
  }
};

export const cleanErrors = (requestType) => {
  return {
    type: CLEAN_ERRORS,
    requestType: requestType
  }
};

export const loadUsers = (values, page = 0, filters = {}, totalPages = 0) => ({
  type: LOAD_USERS,
  payload: {
    values,
    page,
    filters,
    totalPages
  }
});

export const loadUser = (value) => ({
  type: LOAD_USER,
  payload: {
    value
  }
});

export const showModal = (modalType, modalContentProps = {}) => ({
  type: modal.SHOW_MODAL,
  modalType,
  modalContentProps
});

export const hideModal = () => ({
  type: modal.HIDE_MODAL
});

export const cleanData = (type) => ({
  type: `${CLEAN_DATA}_${type}`
});
