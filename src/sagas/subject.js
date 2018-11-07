import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import validator from '../services/validator'
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_SUBJECT,
    CREATE_SUBJECT_SAGA,
    LOAD_SUBJECTS_LIST_SAGA,
    LOAD_SUBJECT_SAGA,
    EDIT_SUBJECT_SAGA,
    DELETE_SUBJECT_SAGA,
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
    (getFormValues('SubjectsToolbar')(store) || {search: ''}).search
);


const apiCreate = (data) => (
    axios.post(API_SUBJECT, data)
);

const apiEdit = (data, id) => (
    axios.patch(`${API_SUBJECT}/${id}`, data)
);

function* _createSubjectSaga() {
    try {
        const generatedFields = yield select(store => (getFormValues('createSubject')(store)));

        const jsonData = {
            name: generatedFields.name,
        };

        const isValid = yield call(validateUser, jsonData, 'createSubject', CREATE_SUBJECT_SAGA);

        if (!isValid) return;

        const response = yield call(apiCreate, jsonData);

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
        const generatedFields = yield select(store => (getFormValues('editUser')(store)));
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

        const response = yield call(apiEdit, jsonData, id);

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

        const response = yield call(() => axios.get(API_SUBJECT, {
            params: {
                ...apiFilters
            }
        }));

        const subjects = response.data.data;

        const {
            pages,
            total,
            limit
        } = response.data.meta;

        yield put(loadSubjectsList(subjects, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadSubject({id}) {
    try {
        const response = yield call(() => axios.get(`${API_SUBJECT}/${id}`));
        const subject = response.data;

        yield put(loadSubject(subject));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _deleteSubject({id}) {
    try {
        yield call(() => axios.delete(`${API_SUBJECT}/${id}`));

        yield put(deleteSubject(id));
    } catch (e) {
        console.error(e);
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


export {createSubjectSaga, loadSubjectSaga, loadSubjectsListSaga, editSubjectSaga, deleteSubjectItemSaga};