import {fork, all} from 'redux-saga/effects'
import * as authSagas from './auth.js'
import * as userSagas from './user.js'
import * as errorSagas from './errors.js'
import * as toastSagas from './toasts.js'
import * as profileSagas from './profile.js'
import * as subjectSagas from './subject.js'
import * as groupSagas from './group.js'
import * as selectSagas from './select.js'
import * as studentSagas from './student.js';
import * as blogSagas from './blog.js';

const sagas = {
    ...authSagas,
    ...userSagas,
    ...errorSagas,
    ...toastSagas,
    ...profileSagas,
    ...subjectSagas,
    ...groupSagas,
    ...selectSagas,
    ...studentSagas,
    ...blogSagas,
};

export default function* root() {
    yield all(
        Object.keys(sagas).map(sagaKey => fork(sagas[sagaKey]))
    );
}