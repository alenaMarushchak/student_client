import constants from '../constants';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    ADD_ERRORS,
    EDIT_USER,
    UPDATE_SESSION,
    API_ERROR_SAGA,
    CREATE_USER,
    CLEAN_ERRORS,
    LOAD_USERS_LIST,
    LOAD_USER,
    modal,
    DELETE_USER,
    CLEAN_DATA,

    LOAD_SUBJECTS_LIST,
    EDIT_SUBJECT,
    CREATE_SUBJECT,
    DELETE_SUBJECT,
    LOAD_SUBJECT
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


export const deleteUser = (id) => ({
    type   : DELETE_USER,
    payload: id
});

export const cleanData = (type) => ({
    type: `${CLEAN_DATA}_${type}`,
});


export const createSubject = (subject) => {
    return {
        type   : CREATE_SUBJECT,
        payload: subject
    }
};

export const editSubject = (subject) => {
    return {
        type   : EDIT_SUBJECT,
        payload: subject
    }
};


export const loadSubjectsList = (values, page = 0, filters = {}, totalPages = 0) => ({
    type   : LOAD_SUBJECTS_LIST,
    payload: {
        values,
        page,
        filters,
        totalPages
    }
});

export const loadSubject = (value) => ({
    type   : LOAD_SUBJECT,
    payload: {
        value
    }
});


export const deleteSubject = (id) => ({
    type   : DELETE_SUBJECT,
    payload: id
});