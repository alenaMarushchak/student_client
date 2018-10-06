import { fork } from 'redux-saga/effects'
import * as authSagas from './auth.js'
import * as toastSagas from './toasts.js'
import * as usersSagas from './users.js'
import * as errorsSagas from './errors.js'
import * as profileSagas from './profile.js'

const sagas = {
  ...authSagas,
  ...toastSagas,
  ...usersSagas,
  ...errorsSagas,
  ...profileSagas,
};

export default function* root() {
    yield [
      ...Object.keys(sagas).map(sagaKey => fork(sagas[sagaKey]))
    ];
}
