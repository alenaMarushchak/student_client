import constants from '../constants';
import _ from 'lodash';
const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    UPDATE_SESSION,
    LOGOUT
} = constants;

const initialState = {
    user    : null,
    logged  : false,
    loading : false,
    error   : false,
    errorMsg: ''
};
const session = (state = initialState, action) => {
    switch (action.type) {
        case  LOGIN_REQUEST:

            return {
                user    : {},
                logged  : false,
                loading : true,
                error   : false,
                errorMsg: ''
            };
        case LOGIN_SUCCESS:

            return {
                user    : action.user,
                loading : false,
                logged  : true,
                error   : false,
                errorMsg: ''
            };
        case LOGIN_ERROR:

            return {
                user    : {},
                loading : false,
                logged  : false,
                error   : true,
                errorMsg: action.error.errorMsg
            };
        case UPDATE_SESSION:
            const newData = { ...initialState,
                ...action.payload
            };
            return {
                ...newData,
                logged: !_.isEmpty(newData.user)
            };
        case LOGOUT:
            return {
                ...initialState,
                user: {},
                logged: false
            };
        default:
            return state;
    }
};

export {session};
