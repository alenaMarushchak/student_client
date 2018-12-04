import {call, put, select, takeLatest} from 'redux-saga/effects';

import axios from 'axios';
import constants from '../constants';
import actions from '../actions';
import {LOAD_STUDENTS_LIST_SAGA} from "../constants/actionTypes";
import {getFormValues} from "redux-form";

const {
    API_STUDENTS_POINTS_LIST,
    LOAD_STUDENT_POINTS_SAGA,
    API_STUDENTS_LIST
} = constants;

const {
    loadStudentPoints,
    addRequestError,
    loadStudentsList
} = actions;

function* _loadStudentPointsSaga({studentId}) {
    try {

        const request = yield call(() => axios.get(`${API_STUDENTS_POINTS_LIST}/${studentId}`));

        const data = request.data;

        yield put(loadStudentPoints({values: data}));
    } catch (err) {
        console.error(err);
        yield put(addRequestError(err.response));
    }
}

const getSearchValue = (store) => (
    (getFormValues('studentsToolbar')(store) || {search: ''}).search
);

function* _loadStudentListSaga({filters = {}, page = 0}) {
    try {
        const [oldPage, oldFilters] = yield select(store => [
            store.student.list.page, store.student.list.filters
        ]);

        const search = yield select(getSearchValue);
        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
            ...oldFilters,
            ...filters,
        };

        const response = yield call(() => axios.get(API_STUDENTS_LIST, {
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

        yield put(loadStudentsList(subjects, newPage, {...oldFilters, search, ...filters}, pages));
    } catch (err) {
        console.error(err);
        yield put(addRequestError(err.response));
    }
}

function* loadStudentPointsSaga() {
    yield takeLatest(LOAD_STUDENT_POINTS_SAGA, _loadStudentPointsSaga);
}

function* loadStudentsListSaga() {
    yield takeLatest(LOAD_STUDENTS_LIST_SAGA, _loadStudentListSaga)
}

export {
    loadStudentPointsSaga,
    loadStudentsListSaga
};