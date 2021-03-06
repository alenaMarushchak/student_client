import {call, put, select, takeLatest} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';

import {ROLES_BY_VALUE} from "../constants/custom";

import actions from '../actions';

const {
    API,
    API_TYPES,
    API_OWN_TEACHERS_SUBJECT,
    CREATE_SUBJECT_SAGA,
    LOAD_SUBJECTS_LIST_SAGA,
    LOAD_SUBJECT_SAGA,
    EDIT_SUBJECT_SAGA,
    DELETE_SUBJECT_SAGA,
    LOAD_OWN_TEACHER_SUBJECT_SAGA,
    ADD_TEACHER_TO_SUBJECT_SAGA,
    REMOVE_TEACHER_FROM_SUBJECT_SAGA,

    LOAD_GROUPS_BY_SUBJECT_SAGA
} = constants;

const {
    createSubject,
    toast,
    addErrorsSaga,
    addValidateError,
    cleanErrors,
    addRequestError,
    loadSubjectsList,
    loadSubject,
    editSubject,
    deleteSubject,
    hideModal,

    loadOwnTeacherSubjectsList,
    removeTeacherFromSubject,
    addTeacherToSubject,

    loadGroupsBySubject
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
    (getFormValues('SubjectsToolbar')(store) || {search: ''}).search
);

const getSearchValueForGroupsBySubject = (store) => (
    (getFormValues('groupsOfSubjectToolbar')(store) || {search: ''}).search
);

const apiCreate = (API, data) => (
    axios.post(API, data)
);

const apiEdit = (API, data, id) => (
    axios.patch(`${API}/${id}`, data)
);

function* _createSubjectSaga() {
    try {
        const generatedFields = yield select(store => (getFormValues('createSubject')(store)));

        const jsonData = {
            name: generatedFields.name,
        };

        const isValid = yield call(validateUser, jsonData, 'createSubject', CREATE_SUBJECT_SAGA);

        if (!isValid) return;

        let API_REQUEST = API[API_TYPES.SUBJECT]['ADMIN'];

        const response = yield call(apiCreate, API_REQUEST, jsonData);

        const subject = response.data;

        yield put(createSubject(subject));

        yield put(toast.success('Subject was created successfully'));

        yield put(hideModal());
    } catch (e) {
        yield put(addErrorsSaga(CREATE_SUBJECT_SAGA, e.response));
    }
}

function* _editSubjectSaga({id}) {
    try {
        const generatedFields = yield select(store => (getFormValues('editSubject')(store)));
        const {name} = generatedFields;

        const oldFields = yield select(store => store.subjects.selected.value);
        const jsonData = {};

        if (name && oldFields.name !== name) {
            jsonData.name = name;
        }

        if (!Object.keys(jsonData).length) {

            yield put(toast.error('Nothing to update!'));
            yield put(hideModal());

            return;
        }

        const isValid = yield call(validateUser, jsonData, 'editSubject', EDIT_SUBJECT_SAGA);

        if (!isValid) {
            return;
        }

        let API_REQUEST = API[API_TYPES.SUBJECT]['ADMIN'];

        const response = yield call(apiEdit, API_REQUEST, jsonData, id);

        const subject = response.data;

        yield put(editSubject(subject));

        yield put(toast.success('Subject was updated successfully'));

        yield put(hideModal())
    } catch (e) {
        yield put(addErrorsSaga(EDIT_SUBJECT_SAGA, e.response));
    }
}

function* _loadSubjectsList({filters = {}, page = 0}) {
    try {
        const user = yield select(store => store.session.user);

        let API_REQUEST = API[API_TYPES.SUBJECT][ROLES_BY_VALUE[user.role]];

        const [oldPage, oldFilters] = yield select(store => [
            store.subjects.list.page, store.subjects.list.filters
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

        const subjects = response.data.data;

        const {
            pages
        } = response.data.meta;

        yield put(loadSubjectsList(subjects, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadSubject({id}) {
    try {
        const user = yield select(store => store.session.user);

        let API_REQUEST = API[API_TYPES.SUBJECT][ROLES_BY_VALUE[user.role]];

        const response = yield call(() => axios.get(`${API_REQUEST}/${id}`));
        const subject = response.data;

        yield put(loadSubject(subject));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _deleteSubject({id}) {
    try {
        let API_REQUEST = API[API_TYPES.SUBJECT]['ADMIN'];

        yield call(() => axios.delete(`${API_REQUEST}/${id}`));

        yield put(deleteSubject(id));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}


function* _loadOwnTeachersSubjectsSaga({filters = {}, page = 0}) {
    try {
        const [oldPage, oldFilters] = yield select(store => [
            store.subjects.teachersSubject.list.page, store.subjects.teachersSubject.list.filters
        ]);

        const search = yield select(getSearchValue);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(API_OWN_TEACHERS_SUBJECT, {
            params: {
                ...apiFilters
            }
        }));

        const subjects = response.data.data;

        const {
            pages
        } = response.data.meta;

        yield put(loadOwnTeacherSubjectsList(subjects, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _addTeacherToSubjectSaga({subject}) {
    try {
        let {_id, name} = subject;

        let API_REQUEST = API[API_TYPES.SUBJECT]['TEACHER'];

        let subjectId = _id;

        yield call(() => axios.put(`${API_REQUEST}/${subjectId}/add`));

        yield put(addTeacherToSubject({_id, name}));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _removeTeacherFromSubjectSaga({subject}) {
    try {
        let API_REQUEST = API[API_TYPES.SUBJECT]['TEACHER'];

        let subjectId = subject._id;

        yield call(() => axios.put(`${API_REQUEST}/${subjectId}/remove`));

        yield put(removeTeacherFromSubject({subject}));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadGroupsBySubject({page, filters, subjectId}) {
    try {
        let API_REQUEST = API[API_TYPES.SUBJECT]['TEACHER'];

        const [oldPage, oldFilters] = yield select(store => [
            store.subjects.teachersSubject.list.page, store.subjects.teachersSubject.list.filters
        ]);

        const search = yield select(getSearchValueForGroupsBySubject);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(`${API_REQUEST}/${subjectId}/groups`, {
            params: {
                ...apiFilters
            }
        }));

        const subjects = response.data.data;

        const {
            pages
        } = response.data.meta;

        yield put(loadGroupsBySubject(subjects, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* createSubjectSaga() {
    yield takeLatest(CREATE_SUBJECT_SAGA, _createSubjectSaga);
}

function* loadSubjectsListSaga() {
    yield takeLatest(LOAD_SUBJECTS_LIST_SAGA, _loadSubjectsList);
}

function* loadSubjectSaga() {
    yield takeLatest(LOAD_SUBJECT_SAGA, _loadSubject)
}

function* editSubjectSaga() {
    yield takeLatest(EDIT_SUBJECT_SAGA, _editSubjectSaga)
}

function* deleteSubjectItemSaga() {
    yield takeLatest(DELETE_SUBJECT_SAGA, _deleteSubject)
}

function* loadOwnTeachersSubjectsSaga() {
    yield takeLatest(LOAD_OWN_TEACHER_SUBJECT_SAGA, _loadOwnTeachersSubjectsSaga)
}

function* addTeacherToSubjectSaga() {
    yield takeLatest(ADD_TEACHER_TO_SUBJECT_SAGA, _addTeacherToSubjectSaga)
}

function* removeTeacherFromSubjectSaga() {
    yield takeLatest(REMOVE_TEACHER_FROM_SUBJECT_SAGA, _removeTeacherFromSubjectSaga)
}

function* loadGroupsBySubjectSaga() {
    yield takeLatest(LOAD_GROUPS_BY_SUBJECT_SAGA, _loadGroupsBySubject)
}

export {
    createSubjectSaga,
    loadSubjectSaga,
    loadSubjectsListSaga,
    editSubjectSaga,
    deleteSubjectItemSaga,

    loadOwnTeachersSubjectsSaga,
    addTeacherToSubjectSaga,
    removeTeacherFromSubjectSaga,

    loadGroupsBySubjectSaga
};