import {fork, all} from 'redux-saga/effects'
import * as authSagas from './auth.js'
import * as userSagas from './user.js'
import * as errorSagas from './errors.js'
import * as toastSagas from './toasts.js'
import * as profileSagas from './profile.js'

const sagas = {
    ...authSagas,
    ...userSagas,
    ...errorSagas,
    ...toastSagas,
    ...profileSagas
};

export default function* root() {
    yield all(
        Object.keys(sagas).map(sagaKey => fork(sagas[sagaKey]))
    );
}