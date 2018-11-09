import constants from '../constants';

const {
    API_ERROR_SAGA,
    ERROR_TYPE_REQUEST,
    VALIDATE_ERROR_SAGA,
    LOGIN,
    LOGOUT,
    TOAST_SAGA,
    LOGIN_FROM_STORE,
    CREATE_USER_SAGA,
    LOAD_USERS_LIST_SAGA,
    LOAD_USER_SAGA,
    EDIT_USER_SAGA,
    DELETE_USER_SAGA,
    UPLOAD_AVATAR_SAGA,

    CREATE_SUBJECT_SAGA,
    LOAD_SUBJECTS_LIST_SAGA,
    LOAD_SUBJECT_SAGA,
    EDIT_SUBJECT_SAGA,
    DELETE_SUBJECT_SAGA,

    CREATE_GROUP_SAGA,
    LOAD_GROUPS_LIST_SAGA,
    LOAD_GROUP_SAGA,
    EDIT_GROUP_SAGA,
    DELETE_GROUP_SAGA,
    ADD_SUBJECT_TO_GROUP_SAGA,
    REMOVE_SUBJECT_FROM_GROUP_SAGA

} = constants;

export const addRequestError = (response) => {
    return {
        type       : API_ERROR_SAGA,
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
    type: LOGIN
});

export const logoutSaga = () => ({
    type: LOGOUT
});

export const loginFromStore = () => ({
    type: LOGIN_FROM_STORE
});

const defaultToast = (toastType, node) => ({
    type: TOAST_SAGA,
    toastType,
    node
});

const info = (node) => ({
    ...defaultToast('INFO', node)
});

const warning = (node) => ({
    ...defaultToast('WARNING', node)
});

const error = (node) => ({
    ...defaultToast('ERROR', node)
});

const success = (node) => ({
    ...defaultToast('SUCCESS', node)
});

export const toast = {
    default: defaultToast,
    info,
    warning,
    error,
    success
};

export const createUserSaga = () => ({
    type: CREATE_USER_SAGA
});


export const loadUsersListSaga = (page = 0, filters = {}) => ({
    type: LOAD_USERS_LIST_SAGA,
    page,
    filters
});

export const loadUserSaga = (id) => ({
    type: LOAD_USER_SAGA,
    id
});

export const editUserSaga = (id) => {
    return ({
        type: EDIT_USER_SAGA,
        id
    })
};

export const deleteUserItemSaga = (id) => {
    return ({
        type: DELETE_USER_SAGA,
        id
    })
};

export const uploadAvatarSaga = (avatar) => {
    return ({
        type: UPLOAD_AVATAR_SAGA,
        avatar
    })
};

//subjects
export const createSubjectSaga = () => ({
    type: CREATE_SUBJECT_SAGA
});


export const loadSubjectsListSaga = (page = 0, filters = {}) => ({
    type: LOAD_SUBJECTS_LIST_SAGA,
    page,
    filters
});

export const loadSubjectSaga = (id) => ({
    type: LOAD_SUBJECT_SAGA,
    id
});

export const editSubjectSaga = (id) => {
    return ({
        type: EDIT_SUBJECT_SAGA,
        id
    })
};

export const deleteSubjectItemSaga = (id) => {
    return ({
        type: DELETE_SUBJECT_SAGA,
        id
    })
};

//Groups
export const createGroupSaga = () => ({
    type: CREATE_GROUP_SAGA
});


export const loadGroupsListSaga = (page = 0, filters = {}) => ({
    type: LOAD_GROUPS_LIST_SAGA,
    page,
    filters
});

export const loadGroupSaga = (id) => ({
    type: LOAD_GROUP_SAGA,
    id
});

export const editGroupSaga = (id) => {
    return ({
        type: EDIT_GROUP_SAGA,
        id
    })
};

export const deleteGroupItemSaga = (id) => {
    return ({
        type: DELETE_GROUP_SAGA,
        id
    })
};

export const addSubjectToGroupSaga = ({id, subjectId}) => {
    return ({
        type: ADD_SUBJECT_TO_GROUP_SAGA,
        id,
        subjectId
    })
};

export const removeSubjectFromGroupSaga = ({id, subjectId}) => {
    return ({
        type: REMOVE_SUBJECT_FROM_GROUP_SAGA,
        id,
        subjectId
    })
};