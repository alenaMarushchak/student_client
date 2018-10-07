import axios from 'axios';
import auth from './auth';

axios.defaults.baseURL = 'http://localhost:3001';
window.axios = axios;

let instance = null;
class AxiosConfigurator {
    constructor(store) {
        if (!instance) {
            instance = this;
        }
        this.store = store;
        this.subscribeForSessionChange();
        this.loadLocalStorageToken();
        return instance;
    }

    loadLocalStorageToken = () => {
        const {
            user
        } = auth.retrieveSession();
        this.user = user;
    };

    subscribeForSessionChange = () => {
        this.store.subscribe((state) => {
            const user = this.store.getState().session.user;

            if (this.user !== user) {
                this.user = user;
            }
        })
    };

    configureAxios = () => {
        axios.interceptors.request.use(function(config) {
            // Do something before request is sent
            return config;
        }, function(error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function(response) {
            // Do something with response data
            return response;
        }, function(error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
}

export default AxiosConfigurator;
