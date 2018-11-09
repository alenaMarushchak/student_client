export const modal = {

    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
    type      : {
        CREATE_USER   : 'CREATE_USER',
        EDIT_USER     : 'EDIT_USER',
        EDIT_SUBJECT  : 'EDIT_SUBJECT',
        CREATE_SUBJECT: 'CREATE_SUBJECT',
        EDIT_GROUP    : 'EDIT_GROUP',
        CREATE_GROUP  : 'CREATE_GROUP',
    },
    route     : {
        CREATE_USER: '/user',
        EDIT_USER  : '/user'
    }
};

export const toast = {
    type: {
        SUCCESS: 'SUCCESS',
        WARNING: 'WARNING',
        ERROR  : 'ERROR',
        INFO   : 'INFO'
    }
};

export const TOAST_SAGA = 'TOAST_SAGA';
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const API_ERROR_SAGA = 'API_ERROR_SAGA';
export const ERROR_TYPE_REQUEST = 'ERROR_TYPE_REQUEST';
export const VALIDATE_ERROR_SAGA = 'VALIDATE_ERROR_SAGA';

export const ADD_ERRORS = 'ADD_ERRORS';
export const CLEAN_ERRORS = 'CLEAN_ERRORS';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGIN_FROM_STORE = 'LOGIN_FROM_STORE';

export const CLEAN_DATA = 'CLEAN_DATA';

export const CREATE_USER_SAGA = 'CREATE_USER_SAGA';
export const CREATE_USER = 'CREATE_USER';

export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const LOAD_USER = 'LOAD_USER';

export const LOAD_USERS_LIST_SAGA = 'LOAD_USERS_LIST_SAGA';
export const LOAD_USER_SAGA = 'LOAD_USER_SAGA';

export const EDIT_USER_SAGA = 'EDIT_USER_SAGA';
export const EDIT_USER = 'EDIT_USER';

export const DELETE_USER_SAGA = 'DELETE_USER_SAGA';
export const DELETE_USER = 'DELETE_USER';

export const UPLOAD_AVATAR_SAGA = 'UPLOAD_AVATAR_SAGA';


export const CREATE_SUBJECT_SAGA = 'CREATE_SUBJECT_SAGA';
export const CREATE_SUBJECT = 'CREATE_SUBJECT';

export const LOAD_SUBJECTS_LIST = 'LOAD_SUBJECTS_LIST';
export const LOAD_SUBJECT = 'LOAD_SUBJECT';

export const LOAD_SUBJECTS_LIST_SAGA = 'LOAD_SUBJECTS_LIST_SAGA';
export const LOAD_SUBJECT_SAGA = 'LOAD_SUBJECT_SAGA';

export const EDIT_SUBJECT_SAGA = 'EDIT_SUBJECT_SAGA';
export const EDIT_SUBJECT = 'EDIT_SUBJECT';

export const DELETE_SUBJECT_SAGA = 'DELETE_SUBJECT_SAGA';
export const DELETE_SUBJECT = 'DELETE_SUBJECT';


export const LOAD_GROUPS_LIST = 'LOAD_GROUPS_LIST';
export const LOAD_GROUPS_LIST_SAGA = 'LOAD_GROUPS_LIST_SAGA';

export const EDIT_GROUP = 'EDIT_GROUP';
export const EDIT_GROUP_SAGA = 'EDIT_GROUP_SAGA';

export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_GROUP_SAGA = 'CREATE_GROUP_SAGA';

export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_GROUP_SAGA = 'DELETE_GROUP_SAGA';

export const LOAD_GROUP = 'LOAD_GROUP';
export const LOAD_GROUP_SAGA = 'LOAD_GROUP_SAGA';

export const ADD_SUBJECT_TO_GROUP = 'ADD_SUBJECT_TO_GROUP';
export const ADD_SUBJECT_TO_GROUP_SAGA = 'ADD_SUBJECT_TO_GROUP_SAGA';

export const REMOVE_SUBJECT_FROM_GROUP = 'REMOVE_SUBJECT_FROM_GROUP';
export const REMOVE_SUBJECT_FROM_GROUP_SAGA = 'REMOVE_SUBJECT_FROM_GROUP_SAGA';

