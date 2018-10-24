export const modal = {

    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
    type      : {
        CREATE_USER: 'CREATE_USER',
        EDIT_USER  : 'EDIT_USER',
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
}

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