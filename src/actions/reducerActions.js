import constants from '../constants';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    EDIT_USER,
    UPDATE_SESSION,
    API_ERROR_SAGA,
    CREATE_USER,
    CLEAN_ERRORS,
    LOAD_USERS_LIST,
    LOAD_USER,
    modal
} = constants;

export const showModal = (modalType, modalContentProps = {}) => ({
    type: modal.SHOW_MODAL,
    modalType,
    modalContentProps
});

export const hideModal = (path) => ({
    type: modal.HIDE_MODAL,
    path
});

export const requestLogin = () => {
    return {type: LOGIN_REQUEST}
};

export const cleanErrors = (requestType) => {
    return {
        type       : CLEAN_ERRORS,
        requestType: requestType
    }
};

export const addErrorsSaga = (requestType, response) => ({
    type: API_ERROR_SAGA,
    requestType,
    response
});

export const requestLoginSuccess = (data) => {
    return {type: LOGIN_SUCCESS, user: data}
};

export const requestLoginError = (data) => {
    return {type: LOGIN_ERROR, error: {errorMsg: data}}
};

export const updateSession = (user = null) => ({
    type   : UPDATE_SESSION,
    payload: {
        ...(
            user ? {user} : {}
        )
    }
});

export const createUser = (user) => {
    return {
        type   : CREATE_USER,
        payload: user
    }
};

export const editUser = (user) => {
    return {
        type   : EDIT_USER,
        payload: user
    }
};


export const loadUsersList = (values, page = 0, filters = {}, totalPages = 0) => ({
    type   : LOAD_USERS_LIST,
    payload: {
        values,
        page,
        filters,
        totalPages
    }
});

export const loadUser = (value) => ({
    type   : LOAD_USER,
    payload: {
        value
    }
});
