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
    REMOVE_SUBJECT_FROM_GROUP_SAGA,

    LOAD_SELECT_SAGA,

    LOAD_OWN_TEACHER_SUBJECT_SAGA,
    LOAD_ALL_SUBJECT_FOR_TEACHER_SAGA,
    ADD_TEACHER_TO_SUBJECT_SAGA,
    REMOVE_TEACHER_FROM_SUBJECT_SAGA,

    LOAD_GROUPS_BY_SUBJECT_SAGA,

    LOAD_GROUP_WITH_POINTS_SAGA,
    ADD_POINT_TO_STUDENT_SAGA,

    LOAD_STUDENT_POINTS_SAGA,

    LOAD_STUDENTS_LIST_SAGA,

    LOAD_BLOG_LIST_SAGA,
    CREATE_BLOG_SAGA,
    DELETE_BLOG_SAGA,
    LOAD_POSTS_SAGA,
    LOAD_POST_ITEM_SAGA,
    CREATE_POST_SAGA,
    DELETE_POST_SAGA,
    CREATE_COMMENT_SAGA,
    DELETE_COMMENT_SAGA,

    LOAD_ADMIN_STATISTIC_SAGA,

    LOAD_STUDENT_STATISTIC_SAGA
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
export const createGroupSaga = (subjects) => ({
    type: CREATE_GROUP_SAGA,
    subjects
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

export const editGroupSaga = (id, subjects, students) => {
    return ({
        type: EDIT_GROUP_SAGA,
        id,
        subjects,
        students
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

export const loadSelectListSaga = (typeOfApi, page = 0, search) => ({
    type: LOAD_SELECT_SAGA,
    typeOfApi,
    page,
    search
});

/// Teacher saga

export const addTeacherToSubjectSaga = (subject) => {
    return ({
        type: ADD_TEACHER_TO_SUBJECT_SAGA,
        subject
    });
};

export const removeTeacherFromSubjectSaga = (subject) => ({
    type: REMOVE_TEACHER_FROM_SUBJECT_SAGA,
    subject
});

export const loadOwnTeacherSubjectsListSaga = (page = 0, filters = {}) => ({
    type: LOAD_OWN_TEACHER_SUBJECT_SAGA,
    page,
    filters
});


export const loadGroupsBySubjectSaga = (page = 0, subjectId) => ({
    type: LOAD_GROUPS_BY_SUBJECT_SAGA,
    page,
    subjectId
});

export const loadGroupWithStudentsPointsSaga = (subjectId, groupId) => ({
    type: LOAD_GROUP_WITH_POINTS_SAGA,
    groupId,
    subjectId
});

export const addPointToStudentSaga = ({studentId, subjectId, point, pointType}) => ({
    type: ADD_POINT_TO_STUDENT_SAGA,
    studentId, subjectId, point, pointType
});

export const loadStudentPointsSaga = ({studentId = ''}) => ({
    type: LOAD_STUDENT_POINTS_SAGA,
    studentId
});


export const loadStudentsListSaga = (page = 0, filters = {}) => ({
    type: LOAD_STUDENTS_LIST_SAGA,
    page,
    filters
});

export const loadBlogListSaga = (page = 0, filters = {}) => ({
    type: LOAD_BLOG_LIST_SAGA,
    page,
    filters
});

export const createBlogSaga = ({blog}) => {
    return ({
        type: CREATE_BLOG_SAGA,
        blog
    })
};

export const deleteBlogSaga = (blogId) => ({
    type: DELETE_BLOG_SAGA,
    blogId
});

export const createPostSaga = ({blogId, tags}) => ({
    type: CREATE_POST_SAGA,
    blogId,
    tags
});

export const loadPostListSaga = (blogId, page = 0, filters = {}) => ({
    type: LOAD_POSTS_SAGA,
    blogId,
    page,
    filters
});

export const loadPostItemSaga = ({post}) => ({
    type: LOAD_POST_ITEM_SAGA,
    post
});

export const deletePostSaga = (postId) => ({
    type: DELETE_POST_SAGA,
    postId
});

export const loadAdminStatisticSaga = () => ({
    type: LOAD_ADMIN_STATISTIC_SAGA
});

export const loadStudentStatisticSaga = () => ({
    type: LOAD_STUDENT_STATISTIC_SAGA
});