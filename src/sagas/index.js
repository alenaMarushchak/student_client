import { fork } from 'redux-saga/effects'

import * as authSagas from './auth.js'

const sagas = {
    ...authSagas
};

export default function* root() {
    yield [
        ...Object.keys(sagas).map(sagaKey => fork(sagas[sagaKey]))
    ];
}