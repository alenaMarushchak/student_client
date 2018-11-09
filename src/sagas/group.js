import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_GROUP,
    CREATE_GROUP_SAGA,
    LOAD_GROUPS_LIST_SAGA,
    LOAD_GROUP_SAGA,
    EDIT_GROUP_SAGA,
    DELETE_GROUP_SAGA,
} = constants;

const {
    createGroup,
    toast,
    addErrorsSaga,
    addValidateError,
    cleanErrors,
    addRequestError,
    loadGroupsList,
    loadGroup,
    editGroup,
    deleteGroup,
    hideModal
} = actions;

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
    (getFormValues('groupsToolbar')(store) || {search: ''}).search
);


const apiCreate = (data) => (
    axios.post(API_GROUP, data)
);

const apiEdit = (data, id) => (
    axios.patch(`${API_GROUP}/${id}`, data)
);

function* _createGroupSaga() {
    try {
        const generatedFields = yield select(store => (getFormValues('createGroup')(store)));

        const jsonData = {
            name: generatedFields.name,
        };

        const isValid = yield call(validateUser, jsonData, 'createGroup', CREATE_GROUP_SAGA);

        if (!isValid) return;

        const response = yield call(apiCreate, jsonData);

        const subject = response.data;

        yield put(createGroup(subject));

        yield put(toast.success('Group was created successfully'));

        yield put(hideModal());
    } catch (e) {
        yield put(addErrorsSaga(CREATE_GROUP_SAGA, e.response));
    }
}

function* _editGroupSaga({id}) {
    try {
        const generatedFields = yield select(store => (getFormValues('editGroup')(store)));
        const {name} = generatedFields;

        const oldFields = yield select(store => store.groups.selected.value);
        const jsonData = {};

        if (name && oldFields.name !== name) {
            jsonData.name = name;
        }

        if (!Object.keys(jsonData).length) {

            yield put(toast.error('Nothing to update!'));
            yield put(hideModal());

            return;
        }

        const isValid = yield call(validateUser, jsonData, 'editGroup', EDIT_GROUP_SAGA);

        if (!isValid) {
            return;
        }

        const response = yield call(apiEdit, jsonData, id);

        const subject = response.data;

        yield put(editGroup(subject));

        yield put(toast.success('Group was updated successfully'));

        yield put(hideModal())
    } catch (e) {
        yield put(addErrorsSaga(EDIT_GROUP_SAGA, e.response));
    }
}

function* _loadGroupsList({filters = {}, page = 0}) {
    try {
        const [oldPage, oldFilters] = yield select(store => [
            store.groups.list.page, store.groups.list.filters
        ]);

        const search = yield select(getSearchValue);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(API_GROUP, {
            params: {
                ...apiFilters
            }
        }));

        const groups = response.data.data;

        const {
            pages,
            total,
            limit
        } = response.data.meta;

        yield put(loadGroupsList(groups, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadGroup({id}) {
    try {
        const response = yield call(() => axios.get(`${API_GROUP}/${id}`));
        const subject = response.data;

        yield put(loadGroup(subject));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _deleteGroup({id}) {
    try {
        yield call(() => axios.delete(`${API_GROUP}/${id}`));

        yield put(deleteGroup(id));
    } catch (e) {
        console.error(e);
        yield put(addRequestError(e.response));
    }
}

function* createGroupSaga() {
    yield takeLatest(CREATE_GROUP_SAGA, _createGroupSaga);
}

function* loadGroupsListSaga() {
    yield takeLatest(LOAD_GROUPS_LIST_SAGA, _loadGroupsList);
}

function* loadGroupSaga() {
    yield takeLatest(LOAD_GROUP_SAGA, _loadGroup)
}

function* editGroupSaga() {
    yield takeLatest(EDIT_GROUP_SAGA, _editGroupSaga)
}

function* deleteGroupItemSaga() {
    yield takeLatest(DELETE_GROUP_SAGA, _deleteGroup)
}


export {createGroupSaga, loadGroupSaga, loadGroupsListSaga, editGroupSaga, deleteGroupItemSaga};