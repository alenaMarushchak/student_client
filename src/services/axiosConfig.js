import axios from 'axios';
import auth from './auth.js';
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
            token,
            user
        } = auth.retrieveSession();
        this.token = token;
        this.updateToken();
    };

    subscribeForSessionChange = () => {
        this.store.subscribe((state) => {
            const token = this.store.getState().session.token;
            if (this.token != token) {
                this.token = token;
                this.updateToken();
            }
        })
    };

    updateToken = () => {
        if (this.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
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
