import {call, put, select, takeLatest,} from 'redux-saga/effects';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

import {ROLES_BY_VALUE} from "../constants/custom";

const {
    API,
    API_TYPES,
    LOAD_ADMIN_STATISTIC_SAGA,
    API_ADMIN_STATISTIC,
    LOAD_STUDENT_STATISTIC_SAGA
} = constants;

const {
    addRequestError,
    loadAdminStatistic,
    loadStudentStatistic
} = actions;

function* _loadAdminStatisticSaga() {
    try {

        const response = yield call(() => axios.get(API_ADMIN_STATISTIC));

        const statistic = response.data;

        yield put(loadAdminStatistic(statistic));
    } catch (e) {
        yield put(addRequestError(e.response));
    }
}

function* _loadStudentStatisticSaga() {
    try {
        const user = yield select(store => store.session.user);

        let API_REQUEST = API[API_TYPES.STATISTIC][ROLES_BY_VALUE[user.role]];

        const response = yield call(() => axios.get(API_REQUEST));

        const statistic = response.data;

        yield put(loadStudentStatistic(statistic));

    } catch (e) {
        yield put(addRequestError(e.response))
    }
}


function* loadAdminStatisticSaga() {
    yield takeLatest(LOAD_ADMIN_STATISTIC_SAGA, _loadAdminStatisticSaga);
}

function* loadStudentStatisticSaga() {
    yield takeLatest(LOAD_STUDENT_STATISTIC_SAGA, _loadStudentStatisticSaga);
}

export {
    loadAdminStatisticSaga,
    loadStudentStatisticSaga
};