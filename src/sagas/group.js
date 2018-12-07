import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

import {ROLES_BY_VALUE} from "../constants/custom";

const {
    API,
    API_TYPES,
    CREATE_GROUP_SAGA,
    LOAD_GROUPS_LIST_SAGA,
    LOAD_GROUP_SAGA,
    EDIT_GROUP_SAGA,
    DELETE_GROUP_SAGA,

    LOAD_GROUP_WITH_POINTS_SAGA,
    ADD_POINT_TO_STUDENT_SAGA
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
    hideModal,

    loadGroupWithStudentsPoints,
    addPointToStudent
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


const apiCreate = (API, data) => (
    axios.post(API, data)
);

const apiEdit = (API, data, id) => (
    axios.patch(`${API}/${id}`, data)
);

function* _createGroupSaga({subjects}) {
    try {
        let API_REQUEST = API[API_TYPES.SUBJECT]['ADMIN'];

        const generatedFields = yield select(store => (getFormValues('createGroup')(store)));

        const jsonData = {
            name: generatedFields.name,
            subjects
        };

        const isValid = yield call(validateUser,jsonData, 'createGroup', CREATE_GROUP_SAGA);

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

function* _editGroupSaga({id, subjects, students}) {
    try {
        const generatedFields = yield select(store => (getFormValues('editGroup')(store)));
        const {name} = generatedFields;

        const oldFields = yield select(store => store.groups.selected.value);
        const jsonData = {};

        if (name && oldFields.name !== name) {
            jsonData.name = name;
        }


        if (oldFields.subjects !== subjects) {
            jsonData.subjects = subjects;
        }

        if (oldFields.students !== students) {
            jsonData.students = students;
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

        let API_REQUEST = API[API_TYPES.GROUP]['ADMIN'];

        const response = yield call(apiEdit, API_REQUEST, jsonData, id);

        const subject = response.data;

        yield put(hideModal());

        yield put(editGroup(subject));

        yield put(toast.success('Group was updated successfully'));
    } catch (e) {
        yield put(addErrorsSaga(EDIT_GROUP_SAGA, e.response));
    }
}

function* _loadGroupsList({filters = {}, page = 0}) {
    try {
        const user = yield select(store => store.session.user);

        let API_REQUEST = API[API_TYPES.GROUP][ROLES_BY_VALUE[user.role]];

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

        const response = yield call(() => axios.get(API_REQUEST, {
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
        const user = yield select(store => store.session.user);

        let API_REQUEST = API[API_TYPES.GROUP][ROLES_BY_VALUE[user.role]];

        if (ROLES_BY_VALUE[user.role] === 'STUDENT') {
            const response = yield call(() => axios.get(`${API_REQUEST}`));
            const group = response.data;

            yield put(loadGroup(group));
        } else {
            const response = yield call(() => axios.get(`${API_REQUEST}/${id}`));
            const group = response.data;

            yield put(loadGroup(group));
        }
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _deleteGroup({id}) {
    try {
        let API_REQUEST = API[API_TYPES.GROUP][ROLES_BY_VALUE[1]];

        yield call(() => axios.delete(`${API_REQUEST}/${id}`));

        yield put(deleteGroup(id));
    } catch (e) {
        console.error(e);
        yield put(addRequestError(e.response));
    }
}

function* _loadGroupWithPointsSaga({subjectId, groupId}) {
    try {
        let API_REQUEST = API[API_TYPES.GROUP][ROLES_BY_VALUE[5]];

        const response = yield call(() => axios.get(`${API_REQUEST}/${groupId}/subject/${subjectId}`));
        const data = response.data;

        yield put(loadGroupWithStudentsPoints(data));
    } catch (err) {
        console.error(err);
        yield put(addRequestError(err.response));
    }
}

function* _addPointToStudentSaga({studentId, subjectId, point, pointType}) {
    try {
        let API_REQUEST = API[API_TYPES.POINT][ROLES_BY_VALUE[5]];

        let jsonData = {
            subjectId,
            studentId,
            value: point
        };

        yield call(() => axios.put(`${API_REQUEST}/${pointType}`, jsonData));

        yield put(addPointToStudent({studentId, point, pointType}));
    } catch (err) {
        console.error(err);
        yield put(addRequestError(err.response));
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

function* loadGroupWithPointsSaga() {
    yield takeLatest(LOAD_GROUP_WITH_POINTS_SAGA, _loadGroupWithPointsSaga)
}

function* addPointToStudentSaga() {
    yield takeLatest(ADD_POINT_TO_STUDENT_SAGA, _addPointToStudentSaga);
}


export {
    createGroupSaga,
    loadGroupSaga,
    loadGroupsListSaga,
    editGroupSaga,
    deleteGroupItemSaga,
    loadGroupWithPointsSaga,
    addPointToStudentSaga
};