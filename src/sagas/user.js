import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_USER,
    CREATE_USER_SAGA,
    LOAD_USERS_LIST_SAGA,
    LOAD_USER_SAGA,
    EDIT_USER_SAGA,
    DELETE_USER_SAGA,
    UPLOAD_AVATAR_SAGA
} = constants;

const {
    createUser,
    toast,
    addErrorsSaga,
    addValidateError,
    cleanErrors,
    addRequestError,
    loadUsersList,
    loadUser,
    editUser,
    deleteUser,
    hideModal
} = actions;

const SORT_ASC = 1;
const SORT_DESC = -1;

const defaultSortKey = 'name';
const defaultSortOrder = SORT_ASC;

function* validateUser(data, type, action) {
    const errors = validator.validate(data, type);

    if (errors) {
        yield put(addValidateError(action, errors));
        return false;
    } else {
        yield put(cleanErrors(action));
        return true;
    }
}

const getSearchValue = (store) => (
    (getFormValues('usersToolbar')(store) || {search: ''}).search
);


const apiCreateUser = (data) => (
    axios.post(API_USER, data)
);

const apiEditUser = (data, id) => (
    axios.patch(`${API_USER}/${id}`, data)
);

function* _createUserSaga() {
    try {
        const generatedFields = yield select(store => (getFormValues('createUser')(store)));

        const jsonData = {
            firstName: generatedFields.firstName,
            lastName : generatedFields.lastName,
            email    : generatedFields.email,
            role     : generatedFields.role,
        };

        const isValid = yield call(validateUser, jsonData, 'createUser', CREATE_USER_SAGA);

        if (!isValid) return;

        const response = yield call(apiCreateUser, jsonData);

        const user = response.data;

        yield put(createUser(user));

        yield put(toast.success('User was created successfully'));

        yield put(hideModal());
    } catch (e) {
        yield put(addErrorsSaga(CREATE_USER_SAGA, e.response));
    }
}

function* _editUserSaga({id}) {
    try {
        const generatedFields = yield select(store => (getFormValues('editUser')(store)));
        const {firstName, lastName, email, role} = generatedFields;

        const oldFields = yield select(store => store.users.selected.value);
        const jsonData = {};

        if (firstName && oldFields.firstName !== firstName) {
            jsonData.firstName = firstName;
        }

        if (lastName && oldFields.lastName !== lastName) {
            jsonData.lastName = lastName;
        }

        if (email && oldFields.email !== email) {
            jsonData.email = email;
        }

        if (role && oldFields.role !== role) {
            jsonData.role = role;
        }

        if (!Object.keys(jsonData).length) {

            yield put(toast.error('Nothing to update!'));
            yield put(hideModal());

            return;
        }

        const isValid = yield call(validateUser, jsonData, 'editUser', EDIT_USER_SAGA);

        if (!isValid) {
            return;
        }

        const response = yield call(apiEditUser, jsonData, id);

        const user = response.data;

        yield put(editUser(user));

        yield put(toast.success('User was updated successfully'));

        yield put(hideModal())
    } catch (e) {
        yield put(addErrorsSaga(EDIT_USER_SAGA, e.response));
    }
}

function* _loadUsersList({filters = {}, page = 0}) {
    try {
        const [oldPage] = yield select(store => [
            store.users.list.page
        ]);

        const search = yield select(getSearchValue);
        const newPage = (page > 0 ? page : oldPage);

        let {sortKey = defaultSortKey, sortOrder = defaultSortOrder} = filters;

        const apiFilters = {
            page: newPage,
            search,
            sort: {
                sortKey,
                sortOrder
            }
        };

        const response = yield call(() => axios.get(API_USER, {
            params: {
                ...apiFilters
            }
        }));

        const users = response.data.data;

        const {
            pages,
            total,
            limit
        } = response.data.meta;

        yield put(loadUsersList(users, newPage, {search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
        console.error(e);
    }
}

function* _loadUser({id}) {
    try {
        const response = yield call(() => axios.get(`${API_USER}/${id}`));
        const user = response.data;

        yield put(loadUser(user));
    } catch (e) {
        console.error(e);
        yield put(addRequestError(e.response));
    }
}

function* _deleteUser({id}) {
    try {
        yield call(() => axios.delete(`${API_USER}/${id}`));

        yield put(deleteUser(id));
    } catch (e) {
        console.error(e);
        yield put(addRequestError(e.response));
    }
}

function* createUserSaga() {
    yield takeLatest(CREATE_USER_SAGA, _createUserSaga);
}

function* loadUsersListSaga() {
    yield takeLatest(LOAD_USERS_LIST_SAGA, _loadUsersList);
}

function* loadUserSaga() {
    yield takeLatest(LOAD_USER_SAGA, _loadUser)
}

function* editUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, _editUserSaga)
}

function* deleteUserItemSaga() {
    yield takeLatest(DELETE_USER_SAGA, _deleteUser)
}


export {createUserSaga, loadUserSaga, loadUsersListSaga, editUserSaga, deleteUserItemSaga};