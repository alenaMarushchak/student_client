import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import constants from '../constants';
import actions from '../actions';

const {
    API_PROFILE,
    UPLOAD_AVATAR_SAGA
} = constants;


const {
    toast,
    addErrorsSaga,
    updateSession
} = actions;


const formatData = (json) => {
    let data = new FormData();

    Object.keys(json).forEach(field => {
        data.append(`${field}`, json[field]);
    });
    return data;
};

const apiUpdateProfile = (data) => (
    axios.put(API_PROFILE, data)
);

function* _updateProfileAvatar({avatar: {avatar: file}}) {
    try {
        const jsonData = {
            avatar: file
        };

        console.log('_updateProfileAvatar');
        console.log(file);

        if (file.type.indexOf('image') === -1) {
            yield put(addErrorsSaga(UPLOAD_AVATAR_SAGA, 'Invalid file'));
            return;
        }

        const data = yield call(formatData, jsonData);

        const response = yield call(apiUpdateProfile, data);
        const loadedUser = response.data;

        yield call(updateSession, loadedUser);

        yield put(toast.success('Profile was updated successfully'))
    } catch (e) {
        yield put(addErrorsSaga(UPLOAD_AVATAR_SAGA, e.response));
        console.error(e);
    }
}


function* updateProfileAvatar() {
    yield takeEvery(UPLOAD_AVATAR_SAGA, _updateProfileAvatar);
}

export {updateProfileAvatar};