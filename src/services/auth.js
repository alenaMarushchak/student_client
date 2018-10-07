import storage from './storage';

const SESSION_KEY = 'session';
class AuthService {
    storeSession(user = {}) {
        return storage.set(SESSION_KEY, {
            user
        });
    }

    retrieveSession() {
        return {
            user: {},
            ...storage.get(SESSION_KEY)
        };
    }
}

export default (new AuthService());
