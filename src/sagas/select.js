import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getFormValues} from 'redux-form';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

import {MULTI_SELECT_TYPES} from '../constants/custom'

const {
    API_SUBJECT_SELECT,
    API_STUDENT_SELECT,
    LOAD_SELECT_SAGA,
} = constants;

const {
    addRequestError,
    loadSelectList,
} = actions;


function* _loadSelectList({typeOfApi, page, search = ''}) {
    try {
        let API;

        const [oldPage] = yield select(store => [
            store.selectOptions.list.page
        ]);


        const newPage = (page > 0 ? page : oldPage);

        const apiFilters = {
            page: newPage,
            search,
        };

        switch (typeOfApi) {
            case MULTI_SELECT_TYPES.SUBJECT:
                API = API_SUBJECT_SELECT;
                break;
            case MULTI_SELECT_TYPES.STUDENT:
                API = API_STUDENT_SELECT;
                break;
            default:
                API = API_SUBJECT_SELECT;
        }

        const response = yield call(() => axios.get(API, {
            params: {
                ...apiFilters
            }
        }));

        const selectOptions = response.data.data;

        const {
            pages,
            total,
            limit
        } = response.data.meta;

        yield put(loadSelectList(selectOptions, newPage, {search}, pages));
    } catch (e) {
        yield put(addRequestError(e.response));
        console.error(e);
    }
}

function* loadSelectListSaga() {
    yield takeLatest(LOAD_SELECT_SAGA, _loadSelectList);
}

export {loadSelectListSaga};